import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime
from backend.database.connection import Base

class SecurityEvent(Base):
    __tablename__ = "security_events"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    event_type = Column(String, nullable=False) # Prompt Injection, SQL Injection, MFA Failure
    severity = Column(String, default="High") # Low, Medium, High, Critical
    username = Column(String, nullable=False)
    ip = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    details = Column(String, nullable=False)
