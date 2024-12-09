from redis import asyncio as aioredis
from api.config import config

redis = aioredis.from_url(config.REDIS_URL)
