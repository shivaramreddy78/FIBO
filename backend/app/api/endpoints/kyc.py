from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.user import User
from app.models.kyc import KYC
from app.schemas.kyc import KYCCreate, KYCResponse
from app.auth.deps import get_current_active_user

router = APIRouter()

@router.post("/submit", response_model=KYCResponse)
def submit_kyc(
    kyc_in: KYCCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Check if user already submitted KYC
    if current_user.kyc:
        raise HTTPException(
            status_code=400,
            detail="KYC has already been submitted for this user.",
        )
        
    # Check for duplicate Aadhaar/PAN across system (basic fraud check)
    existing_kyc = db.query(KYC).filter(
        (KYC.aadhaar_number == kyc_in.aadhaar_number) | 
        (KYC.pan_number == kyc_in.pan_number)
    ).first()
    
    if existing_kyc:
        raise HTTPException(
            status_code=400,
            detail="These KYC details are already associated with another account.",
        )

    new_kyc = KYC(
        user_id=current_user.id,
        aadhaar_number=kyc_in.aadhaar_number,
        pan_number=kyc_in.pan_number,
        status="verified" # Auto-verifying for the hackathon prototype
    )
    db.add(new_kyc)
    db.commit()
    db.refresh(new_kyc)
    return new_kyc

@router.get("/status", response_model=KYCResponse)
def get_kyc_status(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    if not current_user.kyc:
        raise HTTPException(
            status_code=404,
            detail="KYC not found for this user.",
        )
    return current_user.kyc
