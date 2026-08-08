import uuid
from datetime import datetime
from sqlalchemy import Column, String, Float, Text, DateTime, ForeignKey
from backend.database.connection import Base

class ChatHistory(Base):
    __tablename__ = "chat_history"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    question = Column(Text, nullable=False)
    generated_sql = Column(Text, nullable=True)
    ai_response = Column(Text, nullable=False)
    confidence_score = Column(Float, default=98.4)
    created_at = Column(DateTime, default=datetime.utcnow)
