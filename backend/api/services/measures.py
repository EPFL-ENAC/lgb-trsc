import io
import json
import datetime
import pkg_resources
from api.services.s3 import s3_client
from api.services.db import db_client, DBQuery
from fastapi.exceptions import HTTPException
from api.models.measures import Datasets, SensorData, SensorDataSpec, DatasetFile, Vector
import pandas as pd
import numpy as np
from fastapi.logger import logger
from api.config import config
from api.cache import redis

lock = redis.lock("s3_measures", timeout=10)

START_DATETIME = datetime.datetime(2024, 4, 8)


class MeasuresService:

    async def get_datasets(self) -> Datasets:
        """Get the datasets from the S3 storage

        Returns:
            Datasets: The datasets description
        """
        data_file_path = pkg_resources.resource_filename(
            "api", "data/datasets.json")
        with open(data_file_path) as f:
            datasets_dict = json.load(f)
            return Datasets(**datasets_dict)
        return Datasets()

    async def get_dataset(self, name: str, from_date=None, to_date=None) -> SensorData:
        """Get a dataset from the S3 or the InfluxDB storage

        Args:
            dataset_id (str): The dataset identifier

        Returns:
            dict: The dataset description
        """
        datasets = await self.get_datasets()
        for sensor in datasets.sensors:
            if sensor.name == name:
                if sensor.db_spec:
                    try:
                        return await self.get_dataset_from_db(sensor, from_date, to_date)
                    except Exception as e:
                        logger.error(
                            f"Error while getting dataset from InfluxDB: {e}")
                        if sensor.file_spec:
                            logger.warning(
                                f"Getting dataset from file: {sensor.file_spec.file}")
                            return await self.get_dataset_from_file(datasets, sensor, from_date, to_date)
                elif sensor.file_spec:
                    return await self.get_dataset_from_file(datasets, sensor, from_date, to_date)
        raise HTTPException(status_code=404,
                            detail="Sensor not found")

    async def get_dataset_from_file(self, datasets: Datasets, sensor: SensorDataSpec, from_date: datetime.datetime = None, to_date: datetime.datetime = None) -> SensorData:
        file_specs = self.get_file_specs(
            datasets, sensor.file_spec.file)
        df = await self.read_dataset_file(file_specs)
        for column in sensor.file_spec.columns:
            if column.name in df.columns:
                if column.measure == "timestamp":
                    df[column.name] = pd.to_datetime(
                        df[column.name], format=column.format)
                    df.drop_duplicates(subset=column.name, inplace=True)
                    df.set_index(
                        column.name, drop=False, inplace=True)
                    df.sort_index(inplace=True)
                elif df[column.name].dtype == 'object':
                    df[column.name] = df[column.name].str.replace(
                        ',', '.').astype('float')

        # remove columns that are not in the file
        df = df[[
            column.name for column in sensor.file_spec.columns if column.name in df.columns]]

        if from_date is None or to_date is None:
            # no (or partial) time range defined: sample per hour mean
            df = df.resample(sensor.file_spec.aggregate).mean()
        else:
            # if the time range is less than a threshold, keep the original data
            from_date_range = self.get_nearest_timestamp(df, from_date)
            to_date_range = self.get_nearest_timestamp(df, to_date)
            try:
                df = df[from_date_range:to_date_range]
            except KeyError:
                logger.error(
                    f"Error while filtering the dataset: {sensor.name} {from_date_range} - {to_date_range}")
            if self.to_resample(from_date_range, to_date_range):
                df = df.resample(sensor.file_spec.aggregate).mean()
        df = df.replace({np.nan: None})

        vectors = []
        for column in sensor.file_spec.columns:
            if column.name in df.columns:
                if column.measure == "timestamp":
                    vectors.append(Vector(measure=column.measure,
                                   values=df[column.name].astype(str).tolist()))
                else:
                    vectors.append(Vector(measure=column.measure,
                                   values=df[column.name].tolist()))
        return SensorData(name=sensor.name, vectors=vectors)

    async def get_dataset_from_db(self, sensor: SensorDataSpec, from_date: datetime.datetime = None, to_date: datetime.datetime = None) -> SensorData:
        from_datetime = from_date if from_date else START_DATETIME
        to_datetime = to_date if to_date else datetime.datetime.now()
        query = DBQuery(
            sensor.db_spec.measurement, from_datetime, to_date if to_date else "now()")
        query.filter(sensor.db_spec.location.field,
                     sensor.db_spec.location.value)
        # handle multiple measures
        query.filters(sensor.db_spec.filters)
        if self.to_resample(from_datetime, to_datetime):
            query.aggregate(sensor.db_spec.aggregate, "mean")
        #query.not_null()

        content = await redis.get(query.to_string())
        vectors = []
        if not content:
            logger.info(
                f"Query result not found in cache, getting it from InfluxDB: {query.to_string()}")
            time, value, measure = db_client.execute(query.to_string(), sensor.db_spec.filters)
            # transpose long to wide format
            df = pd.DataFrame(
                {"timestamp": time, "value": value, "measure": measure})
            # sort by timestamp, measure and value so that the duplicate with non value is kept
            df = df.sort_values(by=["timestamp", "measure", "value"], key=lambda col: col.isnull())
            df = df.drop_duplicates(subset=["timestamp", "measure"])
            df = df.pivot(index="timestamp", columns="measure", values="value")
            df = df.reset_index()
            df = df.replace({np.nan: None})
            vectors = [
                Vector(measure="timestamp", values=[
                    t.strftime("%Y-%m-%d %H:%M:%S") for t in df['timestamp'].tolist()]),
            ]
            for column in df.columns:
                if column != "timestamp":
                    vectors.append(Vector(measure=column, values=df[column].tolist()))
            await redis.set(query.to_string(), json.dumps(
                [vector.model_dump() for vector in vectors]), ex=config.CACHE_SOURCE_EXPIRY)
        else:
            vectors = [Vector(**vector_dict)
                       for vector_dict in json.loads(content)]

        return SensorData(name=sensor.name, vectors=vectors)

    def to_resample(self, from_date: datetime.datetime, to_date: datetime.datetime):
        difference = to_date - from_date
        hours_difference = difference.total_seconds() / 3600
        return hours_difference > config.RESAMPLE_THRESHOLD

    def get_nearest_timestamp(self, df: pd.DataFrame, timestamp: datetime.datetime):
        if timestamp in df.index:
            return timestamp
        else:
            # Find the index position of the nearest date
            idx_pos = df.index.get_indexer([timestamp], method="nearest")[0]
            nearest_date = df.index[idx_pos]
            return nearest_date

    def get_file_specs(self, datasets: Datasets, name: str) -> DatasetFile:
        """Get the file specs from the S3 storage

        Args:
            file_path (str): The file path

        Returns:
            dict: The file specs
        """
        for file in datasets.files:
            if file.file == name:
                return file
        raise HTTPException(status_code=404,
                            detail=f"File specs not found: {name}")

    async def read_dataset_file_concurrently(self, dataset_file: DatasetFile) -> pd.DataFrame:
        if await lock.acquire():
            try:
                return await self.read_dataset_file(dataset_file)
            finally:
                await lock.release()
        else:
            return await self.read_dataset_file(dataset_file)

    async def read_dataset_file(self, dataset_file: DatasetFile) -> pd.DataFrame:
        file_path = f"timeseries/{dataset_file.file}"
        # Retrieve the content of data file and cache it
        content = await redis.get(file_path)
        if not content:
            logger.info(
                f"File not found in cache, getting it from S3: {file_path}")
            content, mime_type = await s3_client.get_file(file_path)
            # check content is not False
            if not content:
                raise HTTPException(status_code=404,
                                    detail=f"File not found: {s3_client.to_s3_key(file_path)}")
            await redis.set(file_path, content, ex=config.CACHE_SOURCE_EXPIRY)
        df = pd.read_csv(io.BytesIO(
            content), sep=dataset_file.separator, skiprows=dataset_file.skip)

        return df
