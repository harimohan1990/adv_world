from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional, Union, List

class Settings(BaseSettings):
    # App
    PROJECT_NAME: str = "AI Advertising Marketplace API"
    VERSION: str = "1.0.0"
    
    # Database
    DATABASE_URL: str
    
    # Redis
    REDIS_URL: str
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS (Stored as a comma-separated string to avoid Pydantic JSON parsing issues on Render)
    BACKEND_CORS_ORIGINS: str = "http://localhost:3000,http://localhost:5173,http://localhost:5175"
    
    # AI Provider
    AI_PROVIDER_API_KEY: Optional[str] = None
    
    # Render default injected vars (optional)
    PORT: Optional[str] = None
    RENDER: Optional[str] = None
    
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True, extra="ignore")

settings = Settings()
