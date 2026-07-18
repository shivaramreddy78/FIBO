from sqlalchemy import Column, String, ForeignKey, Uuid
from sqlalchemy.orm import relationship
from app.database.session import Base
from app.models.base import UUIDMixin

class KYC(Base, UUIDMixin):
    __tablename__ = "kyc"

    user_id = Column(Uuid(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    aadhaar_number = Column(String(12), unique=True, index=True)
    pan_number = Column(String(10), unique=True, index=True)
    status = Column(String(50), default="pending")

    user = relationship("User", back_populates="kyc")
