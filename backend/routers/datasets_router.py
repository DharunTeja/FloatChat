import os
from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.dataset import Dataset
from backend.models.audit import AuditLog
from backend.schemas.dataset import DatasetResponse
from backend.auth.dependencies import require_researcher, get_current_user
from backend.services.sha256_service import SHA256Service
from backend.services.netcdf_service import NetCDFService
from backend.models.user import User

router = APIRouter(prefix="", tags=["Datasets Pipeline"])

UPLOAD_DIR = "./uploaded_datasets"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload", response_model=DatasetResponse, status_code=status.HTTP_201_CREATED)
async def upload_dataset(
    file: UploadFile = File(...), 
    db: Session = Depends(get_db), 
    current_user: User = Depends(require_researcher)
):
    # Validate extension
    filename = file.filename or "argo_profile.nc"
    ext = os.path.splitext(filename)[1].lower()
    if ext not in [".nc", ".csv", ".json"]:
        raise HTTPException(status_code=400, detail="Unsupported file format. Allowed: .nc, .csv, .json")

    file_bytes = await file.read()
    sha256_hash = SHA256Service.compute_sha256(file_bytes)

    # Duplicate check
    existing = db.query(Dataset).filter(Dataset.sha256_hash == sha256_hash).first()
    if existing:
        raise HTTPException(status_code=400, detail="Duplicate dataset detected. SHA-256 hash already exists in storage.")

    # Save to upload dir
    file_path = os.path.join(UPLOAD_DIR, f"{sha256_hash[:12]}_{filename}")
    with open(file_path, "wb") as f:
        f.write(file_bytes)

    # Extract metadata
    extracted_meta = NetCDFService.parse_and_extract_metadata(filename, file_bytes)

    file_size_str = f"{len(file_bytes) / (1024 * 1024):.1f} MB"
    new_ds = Dataset(
        dataset_name=filename,
        dataset_type=ext,
        file_path=file_path,
        file_size=file_size_str,
        sha256_hash=sha256_hash,
        uploaded_by=current_user.name,
        verification_status="Verified",
        meta_data=extracted_meta
    )
    db.add(new_ds)

    audit = AuditLog(
        username=current_user.name,
        role=current_user.role,
        action="UPLOAD_DATASET",
        ip_address="127.0.0.1",
        status="Success",
        description=f"Uploaded {filename} ({file_size_str}) with SHA-256 integrity"
    )
    db.add(audit)
    db.commit()
    db.refresh(new_ds)
    return new_ds

@router.get("/datasets", response_model=List[DatasetResponse])
def list_datasets(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(Dataset).all()

@router.get("/dataset/{dataset_id}", response_model=DatasetResponse)
def get_dataset(dataset_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    ds = db.query(Dataset).filter(Dataset.id == dataset_id).first()
    if not ds:
        raise HTTPException(status_code=404, detail="Dataset not found")
    return ds

@router.delete("/dataset/{dataset_id}")
def delete_dataset(dataset_id: str, db: Session = Depends(get_db), current_user: User = Depends(require_researcher)):
    ds = db.query(Dataset).filter(Dataset.id == dataset_id).first()
    if not ds:
        raise HTTPException(status_code=404, detail="Dataset not found")

    db.delete(ds)
    audit = AuditLog(
        username=current_user.name,
        role=current_user.role,
        action="DELETE_DATASET",
        ip_address="127.0.0.1",
        status="Success",
        description=f"Deleted dataset {ds.dataset_name}"
    )
    db.add(audit)
    db.commit()
    return {"message": "Dataset deleted successfully"}
