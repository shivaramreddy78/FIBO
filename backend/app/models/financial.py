from sqlalchemy import Column, Float, ForeignKey, Uuid
from sqlalchemy.orm import relationship
from app.database.session import Base
from app.models.base import UUIDMixin

class FinancialProfile(Base, UUIDMixin):
    __tablename__ = "financial_profiles"

    user_id = Column(Uuid(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, unique=True)
    monthly_income = Column(Float, default=0.0)
    monthly_expenses = Column(Float, default=0.0)
    savings = Column(Float, default=0.0)
    business_revenue = Column(Float, default=0.0)
    
    # Added fields
    loan_amount = Column(Float, default=0.0)
    emi = Column(Float, default=0.0)
    rent = Column(Float, default=0.0)
    utilities = Column(Float, default=0.0)

    user = relationship("User", back_populates="financial_profile")
