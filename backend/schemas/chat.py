from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class ChatRequest(BaseModel):
    question: str
    dataset_id: Optional[str] = None

class SqlGenerateRequest(BaseModel):
    question: str

class RagSearchRequest(BaseModel):
    query: str
    top_k: Optional[int] = 5

class ChatResponse(BaseModel):
    id: str
    question: str
    generated_sql: Optional[str] = None
    ai_response: str
    confidence_score: float = 98.4
    retrieved_docs: Optional[List[Dict[str, Any]]] = None
    execution_time_ms: int = 142
