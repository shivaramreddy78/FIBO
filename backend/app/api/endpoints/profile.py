from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.user import User, UserProfile
from app.auth.deps import get_current_user
from app.schemas.profile import ProfileResponse, ProfileUpdate

router = APIRouter()

@router.get("", response_model=ProfileResponse)
def get_profile(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    profile = db.query(UserProfile).filter(UserProfile.user_id == str(current_user.id)).first()
    
    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "mobile_number": current_user.mobile_number,
        "occupation": profile.occupation if profile else None,
        "city": profile.city if profile else None,
        "state": profile.state if profile else None
    }

@router.put("", response_model=ProfileResponse)
def update_profile(
    data: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Update core user fields
    if data.full_name is not None:
        current_user.full_name = data.full_name
    if data.mobile_number is not None:
        current_user.mobile_number = data.mobile_number

    # Update or create UserProfile
    profile = db.query(UserProfile).filter(UserProfile.user_id == str(current_user.id)).first()
    
    if not profile:
        profile = UserProfile(user_id=str(current_user.id))
        db.add(profile)
    
    if data.occupation is not None:
        profile.occupation = data.occupation
    if data.city is not None:
        profile.city = data.city
    if data.state is not None:
        profile.state = data.state
        
    db.commit()
    db.refresh(current_user)
    db.refresh(profile)

    return {
        "id": current_user.id,
        "email": current_user.email,
        "full_name": current_user.full_name,
        "mobile_number": current_user.mobile_number,
        "occupation": profile.occupation,
        "city": profile.city,
        "state": profile.state
    }
