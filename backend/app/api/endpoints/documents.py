import os
import shutil
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.models.user import User
from app.models.document import Document
from app.schemas.document import DocumentResponse
from app.auth.deps import get_current_active_user

router = APIRouter()

UPLOAD_DIR = "uploads"
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB
ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"]

if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.post("/upload", response_model=DocumentResponse)
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF, JPG, and PNG are allowed.")
    
    # Read file size
    file.file.seek(0, 2)
    file_size = file.file.tell()
    file.file.seek(0)
    
    if file_size > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large. Maximum size is 10 MB.")

    file_path = os.path.join(UPLOAD_DIR, f"{current_user.id}_{file.filename}")
    
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    new_doc = Document(
        user_id=current_user.id,
        filename=file.filename,
        file_path=file_path,
        file_type=file.content_type,
        size_bytes=file_size
    )
    
    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)
    
    return new_doc

@router.get("/", response_model=list[DocumentResponse])
def get_user_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return current_user.documents
