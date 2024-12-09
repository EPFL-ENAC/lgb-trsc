from fastapi import APIRouter
from fastapi_cache.decorator import cache
from datetime import datetime
from api.services.measures import MeasuresService
from api.models.measures import Datasets, SensorData
from api.config import config

router = APIRouter()


@router.get("/datasets", response_model=Datasets)
# @cache(expire=60)  # Set cache expiry to 60 seconds
async def get_datasets(
) -> Datasets:
    """Get all datasets"""
    service = MeasuresService()
    return await service.get_datasets()


@router.get("/dataset/{name}", response_model=SensorData)
@cache(expire=config.CACHE_API_EXPIRY)  # Set cache expiry to 60 seconds
async def get_sensor_dataset(
    name: str,
    start: str = None,
    end: str = None,
) -> Datasets:
    """Get dataset from sensor name"""
    service = MeasuresService()
    start = datetime.strptime(
        start, "%Y-%m-%dT%H:%M:%S.%fZ") if start is not None else None
    end = datetime.strptime(
        end, "%Y-%m-%dT%H:%M:%S.%fZ") if end is not None else None
    return await service.get_dataset(name, start, end)
