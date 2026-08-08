import uuid
from datetime import datetime
from sqlalchemy import Column, String, DateTime, ForeignKey
from backend.database.connection import Base

class Embedding(Base):
    __tablename__ = "embeddings"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    dataset_id = Column(String, ForeignKey("datasets.id"), nullable=False)
    embedding_id = Column(String, nullable=False)
    faiss_index = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
