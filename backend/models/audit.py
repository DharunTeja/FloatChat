import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime
from backend.database.connection import Base

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    timestamp = Column(DateTime, default=datetime.utcnow)
    username = Column(String, nullable=False)
    role = Column(String, nullable=False)
    action = Column(String, nullable=False)
    ip_address = Column(String, nullable=False)
    status = Column(String, default="Success") # Success, Failed, Denied
    description = Column(String, nullable=False)
