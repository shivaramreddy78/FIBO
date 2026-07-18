from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.user import User
from app.models.kyc import KYC
from app.models.financial import FinancialProfile
from app.models.document import Document
from app.auth.deps import get_current_user

router = APIRouter()

from app.models.workflow import Assessment

@router.get("/summary")
def get_dashboard_summary(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Aggregates user data, KYC, financial profile, and generated AI assessment for the frontend dashboard.
    """
    kyc = db.query(KYC).filter(KYC.user_id == current_user.id).first()
    financial = db.query(FinancialProfile).filter(FinancialProfile.user_id == current_user.id).first()
    documents = db.query(Document).filter(Document.user_id == current_user.id).all()
    
    # Fetch the latest assessment
    assessment = db.query(Assessment).filter(Assessment.user_id == str(current_user.id)).order_by(Assessment.created_at.desc()).first()
    
    if assessment:
        ai_assessment = {
            "score": assessment.score,
            "fhi": assessment.fhi,
            "risk_level": assessment.risk_level,
            "repayment_probability": assessment.repayment_probability,
            "loan_recommendation": assessment.loan_recommendation,
            "fraud_flags": assessment.fraud_flags,
            "explanation": assessment.explanation
        }
    else:
        ai_assessment = None
    
    return {
        "user": {
            "email": current_user.email,
            "role": current_user.role,
        },
        "kyc_status": kyc.status if kyc else None,
        "financial_profile": {
            "monthly_income": financial.monthly_income if financial else 0,
            "monthly_expenses": financial.monthly_expenses if financial else 0,
            "savings": financial.savings if financial else 0,
        } if financial else None,
        "documents": [
            {"id": doc.id, "filename": doc.filename, "size_bytes": doc.size_bytes}
            for doc in documents
        ],
        "ai_assessment": ai_assessment
    }

