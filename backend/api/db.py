from influxdb_client import InfluxDBClient
from api.config import config


influx = InfluxDBClient(
    url=config.INFLUXDB_URL, token=config.INFLUXDB_TOKEN, org=config.INFLUXDB_ORG)
