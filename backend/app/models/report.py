from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database.session import Base
from app.models.base import UUIDMixin

class Report(Base, UUIDMixin):
    __tablename__ = "reports"

    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    report_path = Column(String(512), nullable=False)
    report_type = Column(String(100), nullable=False)

    user = relationship("User", back_populates="reports")
