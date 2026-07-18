from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.database.session import get_db
from app.models.user import User
from app.models.financial import FinancialProfile
from app.models.workflow import Assessment
from app.auth.deps import get_current_user
from app.core.limiter import limiter
from fastapi import Request

import logging
logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/generate")
@limiter.limit("10/minute")
def generate_assessment(
    request: Request,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    logger.info(f"Generating AI assessment for user_id: {current_user.id}")
    
    from app.services.document_parser import DocumentParserService
    from app.models.document import Document
    
    # Eagerly load the financial profile to optimize the database query
    user_with_profile = db.query(User).options(joinedload(User.financial_profile)).filter(User.id == current_user.id).first()
    
    profile = user_with_profile.financial_profile if user_with_profile else None
    
    # Try parsing latest uploaded documents
    documents = db.query(Document).filter(Document.user_id == current_user.id).all()
    parsed_data = None
    for doc in documents:
        # Pass each document to our mock parser architecture
        result = DocumentParserService.parse_document(doc.file_path, doc.file_type)
        if result:
            parsed_data = result
            
    is_demo_analysis = False
    
    if not profile:
        # ==========================================
        # DEMO FALLBACK MECHANISM (HACKATHON MODE)
        # ==========================================
        # If no profile exists and parsing yielded no strict results,
        # generate a highly realistic demo financial profile so the AI Engine never crashes.
        logger.info(f"Financial profile not found for {current_user.id}. Generating Demo Profile.")
        
        is_demo_analysis = True
        profile = FinancialProfile(
            user_id=current_user.id,
            monthly_income=85000.0,
            monthly_expenses=45000.0,
            savings=120000.0,
            business_revenue=0.0,
            loan_amount=0.0,
            emi=0.0,
            rent=15000.0,
            utilities=3500.0
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)

    # Base score
    acs = 300
    
    # Cash flow stability (simplified)
    cash_flow = profile.monthly_income - profile.monthly_expenses
    if cash_flow > 20000:
        acs += 200
    elif cash_flow > 5000:
        acs += 100
    else:
        acs += 20

    # Savings Ratio
    if profile.monthly_income > 0:
        savings_ratio = profile.savings / profile.monthly_income
        if savings_ratio > 0.5:
            acs += 150
        elif savings_ratio > 0.2:
            acs += 80
        
    # Cap at 1000
    acs = min(1000, acs)
    
    # Determine risk level
    if acs >= 800:
        risk = "Very Low"
        prob = "95%+"
    elif acs >= 650:
        risk = "Low"
        prob = "85% - 94%"
    elif acs >= 500:
        risk = "Moderate"
        prob = "70% - 84%"
    else:
        risk = "High"
        prob = "< 70%"
        
    # Generate mock SHAP explainability
    pos_factors = []
    neg_factors = []
    
    if cash_flow > 10000:
        pos_factors.append("Strong positive monthly cash flow detected.")
    else:
        neg_factors.append("Low monthly cash flow limits repayment capacity.")
        
    if profile.savings > 50000:
        pos_factors.append("Healthy savings buffer provides financial stability.")
    elif profile.savings < 5000:
        neg_factors.append("Minimal savings buffer increases default risk.")
        
    if not pos_factors:
        pos_factors.append("No significant positive behavioral markers identified yet.")
    if not neg_factors:
        neg_factors.append("No major risk factors detected.")

    # Financial Health Index (0 - 100)
    fhi = min(100, int((acs - 300) / 7))
    
    # Loan Recommendation Logic
    loan_recommended = acs >= 650
    suggested_interest = round(max(8.5, 18.0 - ((acs - 300) / 100)), 2)
    suggested_amount = int(profile.monthly_income * (12 if acs >= 700 else 6 if acs >= 600 else 2))
    
    # Fraud Detection Mock
    fraud_flags = []
    if profile.monthly_income > 1000000:
        fraud_flags.append("Income mismatch flag: Verify ITR documents.")
        
    loan_recommendation = {
        "status": "Approved" if loan_recommended else "Declined",
        "suggested_interest_rate": suggested_interest,
        "suggested_loan_amount": suggested_amount
    }
    
    # Dynamic SHAP (Decision Factors)
    shap_data = [
        {"name": "Cash Flow Stability", "impact": 40 if cash_flow > 10000 else 15},
        {"name": "Savings Buffer", "impact": 25 if profile.savings > 20000 else 10},
        {"name": "Income Consistency", "impact": 20 if profile.monthly_income > 30000 else 10},
        {"name": "Expense Ratio", "impact": 10 if profile.monthly_expenses < profile.monthly_income * 0.5 else 25},
        {"name": "Utility Payment History", "impact": 5}
    ]
    
    # Sort SHAP data by impact descending
    shap_data.sort(key=lambda x: x["impact"], reverse=True)
    
    # Behavior Score (0-100)
    behavior_score = min(100, int((acs / 1000) * 100))
    
    # Income Stability
    income_stability = "Highly Stable" if cash_flow > 15000 else "Moderate" if cash_flow > 5000 else "Volatile"
    
    # Reason Behind Score
    if loan_recommended:
        reason_behind_score = f"The applicant demonstrates strong financial health with {income_stability.lower()} income and a solid behavioral track record, minimizing default risk."
    else:
        reason_behind_score = f"The applicant was declined due to high expense ratios and {income_stability.lower()} cash flows, presenting elevated default risk."

    explanation = {
        "positive_factors": pos_factors,
        "negative_factors": neg_factors,
        "behavior_score": behavior_score,
        "income_stability": income_stability,
        "reason_behind_score": reason_behind_score,
        "shap_data": shap_data,
        "is_demo_analysis": is_demo_analysis
    }

    # Delete old assessments (for simplicity of hackathon, keep only latest)
    db.query(Assessment).filter(Assessment.user_id == str(current_user.id)).delete()

    new_assessment = Assessment(
        user_id=str(current_user.id),
        score=int(acs),
        fhi=fhi,
        risk_level=risk,
        repayment_probability=prob,
        loan_recommendation=loan_recommendation,
        fraud_flags=fraud_flags,
        explanation=explanation
    )
    
    db.add(new_assessment)
    db.commit()
    db.refresh(new_assessment)
    
    return {"message": "Assessment generated successfully", "assessment_id": new_assessment.id}
