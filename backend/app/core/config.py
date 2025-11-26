from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    DATABASE_URL: str

    GOOGLE_API_KEY: str
    GOOGLE_CSE_ID: str

    CLERK_PEM_PUBLIC_KEY: str

    class Config:
        env_file = ".env"

@lru_cache()
def get_settings():
    return Settings()
