from pydantic import BaseModel
from uuid import UUID
from datetime import datetime

class DocumentResponse(BaseModel):
    id: UUID
    user_id: UUID
    filename: str
    file_type: str
    size_bytes: int
    created_at: datetime

    class Config:
        from_attributes = True
