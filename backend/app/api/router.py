from fastapi import APIRouter
from app.api.endpoints import auth, kyc, financial, documents, assessment, dashboard, consent, profile

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(profile.router, prefix="/profile", tags=["Profile"])
api_router.include_router(kyc.router, prefix="/kyc", tags=["KYC & Verification"])
api_router.include_router(documents.router, prefix="/documents", tags=["documents"])
api_router.include_router(financial.router, prefix="/financial", tags=["financial"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["dashboard"])
api_router.include_router(consent.router, prefix="/consent", tags=["consent"])
api_router.include_router(assessment.router, prefix="/assessment", tags=["assessment"])
