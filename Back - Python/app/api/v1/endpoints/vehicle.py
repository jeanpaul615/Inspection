import json
from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud.inspection import vehicle as crud_vehicule
from app.schemas.inspection.vehicle import Vehicle
from app.core.deps import get_db_inspection
from app.core.auth import verify_token, verify_admin

router = APIRouter()

@router.get("/vehicles/", response_model=List[Vehicle])
def get_all_vehicle(db: Session = Depends(get_db_inspection), token: dict = Depends(verify_token)): 
    verify_admin(token)
    vehicle = crud_vehicule.get_all_vehicle(db)
    return vehicle or []