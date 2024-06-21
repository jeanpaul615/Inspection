from typing import Generator
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.db.session import SessionLocal

def get_db() -> Generator:
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
        
def get_oath2_scheme() -> OAuth2PasswordBearer:
    return OAuth2PasswordBearer(tokenUrl="token")
        
        
