from pydantic import BaseModel, Field
from uuid import UUID
from datetime import datetime
from typing import Optional

class KYCBase(BaseModel):
    aadhaar_number: str = Field(..., pattern=r'^\d{12}$')
    pan_number: str = Field(..., pattern=r'^[A-Z]{5}[0-9]{4}[A-Z]{1}$')

class KYCCreate(KYCBase):
    pass

class KYCResponse(KYCBase):
    id: UUID
    user_id: UUID
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
