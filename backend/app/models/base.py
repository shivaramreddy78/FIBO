import uuid
from sqlalchemy import Column, String, DateTime, Uuid
from sqlalchemy.sql import func

class UUIDMixin:
    id = Column(Uuid(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
