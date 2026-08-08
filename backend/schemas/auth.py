from pydantic import BaseModel, EmailStr
from typing import Optional

class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    mfa_code: Optional[str] = None

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user_id: str
    email: str
    role: str
    name: str

class UserProfileResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str
    is_active: bool
    last_login: str
