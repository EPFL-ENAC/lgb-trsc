from pydantic_settings import BaseSettings
from functools import lru_cache


class Config(BaseSettings):

    PATH_PREFIX: str = "/api"

    REDIS_URL: str = "redis://localhost"
    CACHE_API_EXPIRY: int = 2
    CACHE_SOURCE_EXPIRY: int = 600
    RESAMPLE_THRESHOLD: int = 7 * 24  # sample data when time range is above 7 days

    INFLUXDB_URL: str
    INFLUXDB_ORG: str
    INFLUXDB_TOKEN: str
    INFLUXDB_BUCKET: str

    S3_ENDPOINT_PROTOCOL: str
    S3_ENDPOINT_HOSTNAME: str
    S3_ACCESS_KEY_ID: str
    S3_SECRET_ACCESS_KEY: str
    S3_REGION: str
    S3_BUCKET: str
    S3_PATH_PREFIX: str


@lru_cache()
def get_config():
    return Config()


config = get_config()
