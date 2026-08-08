from pydantic import BaseModel
from datetime import datetime

class AuditLogResponse(BaseModel):
    id: str
    timestamp: datetime
    username: str
    role: str
    action: str
    ip_address: str
    status: str
    description: str

    class Config:
        from_attributes = True
