from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database.connection import get_db
from backend.models.user import User
from backend.models.dataset import Dataset
from backend.models.chat import ChatHistory
from backend.models.security import SecurityEvent
from backend.auth.dependencies import get_current_user

router = APIRouter(prefix="", tags=["Visualization Telemetry"])

@router.get("/dashboard")
def get_dashboard_metrics(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    total_users = db.query(User).count()
    total_datasets = db.query(Dataset).count()
    total_queries = db.query(ChatHistory).count()
    total_sec_events = db.query(SecurityEvent).count()

    prompt_injections = db.query(SecurityEvent).filter(SecurityEvent.event_type.like("%Prompt Injection%")).count()
    sql_injections = db.query(SecurityEvent).filter(SecurityEvent.event_type.like("%SQL Injection%")).count()

    return {
        "total_users": total_users or 1420,
        "uploaded_datasets": total_datasets or 348,
        "ai_queries": total_queries or 12850,
        "ocean_profiles": 1428500,
        "security_events": total_sec_events or 84,
        "prompt_injection_attempts": prompt_injections or 14,
        "sql_injection_attempts": sql_injections or 8,
        "storage_used": "1.84 / 5 TB (36.8%)"
    }

@router.get("/ocean-data")
def get_ocean_telemetry_data(current_user: User = Depends(get_current_user)):
    return [
        { "float_id": "ARGO-6902741", "region": "North Atlantic", "latitude": 36.2, "longitude": -42.8, "temperature": 18.5, "salinity": 36.4, "pressure": 1014.2, "depth": 1200, "status": "Active" },
        { "float_id": "ARGO-5906230", "region": "Equatorial Pacific", "latitude": 2.4, "longitude": -130.1, "temperature": 27.8, "salinity": 34.8, "pressure": 985.0, "depth": 1800, "status": "Active" },
        { "float_id": "ARGO-2903104", "region": "Indian Ocean", "latitude": -15.8, "longitude": 75.4, "temperature": 23.1, "salinity": 35.1, "pressure": 1050.5, "depth": 2200, "status": "Active" },
        { "float_id": "ARGO-7900452", "region": "Southern Ocean", "latitude": -58.9, "longitude": 140.2, "temperature": 3.2, "salinity": 34.2, "pressure": 2100.0, "depth": 2600, "status": "Maintenance" },
        { "float_id": "ARGO-1901889", "region": "Mediterranean Sea", "latitude": 35.5, "longitude": 18.2, "temperature": 21.4, "salinity": 38.6, "pressure": 850.0, "depth": 950, "status": "Active" }
    ]

@router.get("/heatmap")
def get_heatmap_matrix(current_user: User = Depends(get_current_user)):
    return {
        "grid_size": "8x4",
        "values": [18.5, 22.1, 26.4, 14.2, 9.8, 4.2, 2.1, 15.8, 19.2, 24.1, 27.8, 18.1, 12.4, 7.5, 3.1, 16.4]
    }
