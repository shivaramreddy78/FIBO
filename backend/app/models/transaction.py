from sqlalchemy import Column, String, Float, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database.session import Base
from app.models.base import UUIDMixin

class Transaction(Base, UUIDMixin):
    __tablename__ = "transactions"

    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    transaction_type = Column(String(50), nullable=False) # e.g. credit, debit
    category = Column(String(100), nullable=False)
    amount = Column(Float, nullable=False)
    description = Column(String(255), nullable=True)
    transaction_date = Column(DateTime, default=func.now())

    user = relationship("User", back_populates="transactions")
