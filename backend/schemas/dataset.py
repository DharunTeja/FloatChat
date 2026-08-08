from pydantic import BaseModel
from typing import Optional, Dict, Any
from datetime import datetime

class DatasetResponse(BaseModel):
    id: str
    dataset_name: str
    dataset_type: str
    file_path: str
    file_size: str
    sha256_hash: str
    upload_date: datetime
    uploaded_by: str
    verification_status: str
    meta_data: Optional[Dict[str, Any]] = None
    status: str

    class Config:
        from_attributes = True

class FileVerifyRequest(BaseModel):
    sha256_hash: str
