from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse, ForgotPasswordRequest, ResetPasswordRequest
from app.auth.security import get_password_hash, verify_password, create_access_token
from app.auth.deps import get_current_active_user
from app.config.settings import settings
from app.core.limiter import limiter
import logging

logger = logging.getLogger(__name__)

router = APIRouter()

@router.post("/register", response_model=UserResponse)
@limiter.limit("10/minute")
def register(request: Request, user_in: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="An account with this email already exists. Please sign in.",
        )
    user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        mobile_number=user_in.mobile_number,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.post("/login")
@limiter.limit("5/minute")
def login(request: Request, db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    logger.info(f"Login attempt for user: {form_data.username}")
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=UserResponse)
def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@router.post("/forgot-password")
def forgot_password(req: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user:
        # Return 200 to prevent email enumeration
        return {"message": "If that email is in our database, we will send a password reset link to it.", "token": None}
    
    # Generate a temporary reset token (in a real app, email this)
    reset_token = create_access_token(
        data={"sub": str(user.id), "type": "reset"}, 
        expires_delta=timedelta(minutes=15)
    )
    
    # For hackathon demo purposes, we return the token in the payload
    # so the frontend can immediately redirect to the reset page
    return {
        "message": "Password reset link generated.",
        "token": reset_token
    }

@router.post("/reset-password")
def reset_password(req: ResetPasswordRequest, db: Session = Depends(get_db)):
    try:
        from jose import jwt, JWTError
        payload = jwt.decode(req.token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type")
        
        if user_id is None or token_type != "reset":
            raise HTTPException(status_code=400, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=400, detail="Invalid or expired token")
        
    import uuid
    try:
        user_uuid = uuid.UUID(user_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid user ID format")
        
    user = db.query(User).filter(User.id == user_uuid).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    user.hashed_password = get_password_hash(req.new_password)
    db.commit()
    
    return {"message": "Password successfully reset."}
