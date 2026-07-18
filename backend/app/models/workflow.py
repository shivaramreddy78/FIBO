from sqlalchemy import Column, String, Boolean, ForeignKey, Integer, Float, Text, JSON
from sqlalchemy.orm import relationship
from app.database.session import Base
from app.models.base import UUIDMixin

class Consent(Base, UUIDMixin):
    __tablename__ = "consents"

    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    has_consented = Column(Boolean, default=False)
    ip_address = Column(String(50), nullable=True)

    user = relationship("User", back_populates="consents")

class Assessment(Base, UUIDMixin):
    __tablename__ = "assessments"

    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    score = Column(Integer, nullable=False)
    fhi = Column(Integer, nullable=False)
    risk_level = Column(String(50), nullable=False)
    repayment_probability = Column(String(50), nullable=False)
    
    # JSON strings or dialects.postgresql.JSON for SQLite compatibility
    loan_recommendation = Column(JSON, nullable=True)
    fraud_flags = Column(JSON, nullable=True)
    explanation = Column(JSON, nullable=True)

    user = relationship("User", back_populates="assessments")
