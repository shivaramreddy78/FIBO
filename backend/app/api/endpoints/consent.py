from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.user import User
from app.models.workflow import Consent
from app.auth.deps import get_current_user
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class ConsentRequest(BaseModel):
    has_consented: bool

@router.post("")
def record_consent(
    data: ConsentRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    existing_consent = db.query(Consent).filter(Consent.user_id == str(current_user.id)).first()
    
    if existing_consent:
        existing_consent.has_consented = data.has_consented
    else:
        new_consent = Consent(
            user_id=str(current_user.id),
            has_consented=data.has_consented
        )
        db.add(new_consent)
        
    db.commit()
    return {"message": "Consent recorded successfully"}
