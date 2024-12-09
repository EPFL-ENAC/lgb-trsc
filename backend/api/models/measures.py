from typing import List, Optional, Union
from pydantic import BaseModel


class Column(BaseModel):
    name: str
    measure: str
    format: Optional[str] = None


class DataFileSpec(BaseModel):
    file: str
    aggregate: Optional[str] = 'h'
    columns: List[Column]


class DBFilter(BaseModel):
    field: str
    value: str


class DBMeasure(BaseModel):
    measure: str
    value: str

class DBFilters(BaseModel):
    field: str
    measures: List[DBMeasure]

class DataDBSpec(BaseModel):
    measurement: str
    aggregate: Optional[str] = '1h'
    location: DBFilter
    filters: DBFilters


class SensorDataSpec(BaseModel):
    name: str
    file_spec: Optional[DataFileSpec] = None
    db_spec: Optional[DataDBSpec] = None


class Vector(BaseModel):
    measure: str
    values: Optional[Union[List[Optional[str]],
                           List[Optional[int]], List[Optional[float]]]] = []


class SensorData(BaseModel):
    name: str
    vectors: List[Vector]


class DatasetFile(BaseModel):
    file: str
    skip: int
    separator: str


class Datasets(BaseModel):
    files: List[DatasetFile]
    sensors: List[SensorDataSpec]
