from sqlalchemy import Column, String, ForeignKey, Uuid
from sqlalchemy.orm import relationship
from app.database.session import Base
from app.models.base import UUIDMixin

class AuditLog(Base, UUIDMixin):
    __tablename__ = "audit_logs"

    user_id = Column(Uuid(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    action = Column(String(255), nullable=False)
    ip_address = Column(String(50))

    user = relationship("User", back_populates="audit_logs")
