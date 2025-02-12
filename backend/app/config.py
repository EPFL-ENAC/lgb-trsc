import os


class Config:
    DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")
