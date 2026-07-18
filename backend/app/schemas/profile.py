from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID

class ProfileUpdate(BaseModel):
    full_name: Optional[str] = None
    mobile_number: Optional[str] = None
    occupation: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None

class ProfileResponse(BaseModel):
    id: UUID
    email: EmailStr
    full_name: Optional[str] = None
    mobile_number: Optional[str] = None
    occupation: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None

    class Config:
        from_attributes = True
