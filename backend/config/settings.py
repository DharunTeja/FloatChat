import os
from pydantic_settings import BaseSettings

# Determine absolute path to .env file relative to this settings file
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENV_PATH = os.path.join(BASE_DIR, ".env")

class Settings(BaseSettings):
    PROJECT_NAME: str = "FloatChat Enterprise API"
    VERSION: str = "2.4.0"
    API_V1_STR: str = "/api/v1"
    
    # Secret Key & JWT Settings
    SECRET_KEY: str = ""
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    
    # Database Settings (PostgreSQL with SQLite fallback)
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL", 
        "sqlite:///./floatchat.db"
    )
    
    # AI & Groq LLM API Key
    GROQ_API_KEY: str = ""
    
    # Allowed CORS Origins
    CORS_ORIGINS: list[str] = ["*"]
    
    # Security Passkey (loaded from backend/.env)
    SECURITY_LOG_PASSKEY: str = ""
    
    class Config:
        case_sensitive = True
        env_file = ENV_PATH

settings = Settings()
