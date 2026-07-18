from pydantic import BaseModel, EmailStr, Field
from uuid import UUID
from datetime import datetime
from typing import Optional

EMAIL_REGEX = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"

class UserBase(BaseModel):
    email: str = Field(..., pattern=EMAIL_REGEX, description="A valid email address")
    full_name: Optional[str] = None
    mobile_number: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: UUID
    role: str
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ForgotPasswordRequest(BaseModel):
    email: str = Field(..., pattern=EMAIL_REGEX)

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str
