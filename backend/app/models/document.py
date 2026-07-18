from sqlalchemy import Column, String, Integer, ForeignKey, Uuid
from sqlalchemy.orm import relationship
from app.database.session import Base
from app.models.base import UUIDMixin

class Document(Base, UUIDMixin):
    __tablename__ = "documents"

    user_id = Column(Uuid(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    filename = Column(String(255), nullable=False)
    file_path = Column(String(1024), nullable=False)
    file_type = Column(String(50))
    size_bytes = Column(Integer)

    user = relationship("User", back_populates="documents")
