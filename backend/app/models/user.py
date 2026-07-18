from sqlalchemy import Column, String, Boolean, ForeignKey, Float, Integer
from sqlalchemy.orm import relationship
from app.database.session import Base
from app.models.base import UUIDMixin

class User(Base, UUIDMixin):
    __tablename__ = "users"

    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    mobile_number = Column(String(20), nullable=True)
    role = Column(String(50), default="applicant")
    is_active = Column(Boolean, default=True)

    # Relationships
    kyc = relationship("KYC", back_populates="user", uselist=False)
    financial_profile = relationship("FinancialProfile", back_populates="user", uselist=False)
    profile = relationship("UserProfile", back_populates="user", uselist=False)
    documents = relationship("Document", back_populates="user")
    audit_logs = relationship("AuditLog", back_populates="user")
    consents = relationship("Consent", back_populates="user")
    assessments = relationship("Assessment", back_populates="user", order_by="desc(Assessment.created_at)")
    transactions = relationship("Transaction", back_populates="user")
    reports = relationship("Report", back_populates="user")

class UserProfile(Base, UUIDMixin):
    __tablename__ = "user_profiles"

    user_id = Column(String(36), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    occupation = Column(String(255), nullable=True)
    annual_income = Column(Float, nullable=True)
    employment_type = Column(String(100), nullable=True)
    city = Column(String(100), nullable=True)
    state = Column(String(100), nullable=True)
    age = Column(Integer, nullable=True)

    user = relationship("User", back_populates="profile")
