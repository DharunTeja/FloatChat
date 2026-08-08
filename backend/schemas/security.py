from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SecurityEventResponse(BaseModel):
    id: str
    event_type: str
    severity: str
    username: str
    ip: str
    created_at: datetime
    details: str

    class Config:
        from_attributes = True

class PromptCheckRequest(BaseModel):
    prompt: str

class PromptCheckResponse(BaseModel):
    is_safe: bool
    detected_attack: Optional[str] = None
    confidence: float
