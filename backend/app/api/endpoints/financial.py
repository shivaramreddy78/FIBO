from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.financial import FinancialProfile
from app.models.user import User
from app.schemas.financial import FinancialProfileCreate, FinancialProfileResponse
from app.auth.deps import get_current_user
import uuid

router = APIRouter()

@router.post("/", response_model=FinancialProfileResponse)
def create_or_update_financial_profile(
    profile_in: FinancialProfileCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create or update financial profile for the current user.
    """
    profile = db.query(FinancialProfile).filter(FinancialProfile.user_id == current_user.id).first()
    
    if profile:
        profile.monthly_income = profile_in.monthly_income
        profile.monthly_expenses = profile_in.monthly_expenses
        profile.savings = profile_in.savings
        profile.business_revenue = profile_in.business_revenue or 0.0
    else:
        profile = FinancialProfile(
            user_id=current_user.id,
            monthly_income=profile_in.monthly_income,
            monthly_expenses=profile_in.monthly_expenses,
            savings=profile_in.savings,
            business_revenue=profile_in.business_revenue or 0.0
        )
        db.add(profile)
    
    db.commit()
    db.refresh(profile)
    return profile

@router.get("/", response_model=FinancialProfileResponse)
def get_financial_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get current user's financial profile.
    """
    profile = db.query(FinancialProfile).filter(FinancialProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Financial profile not found for this user"
        )
    return profile
