import secrets
import string
from .database import SessionLocal
from .models import URL

def create_short_code():
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for _ in range(6))

def create_url(db, original_url: str):
    short_code = create_short_code()
    db_url = URL(original_url=original_url, short_code=short_code)
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    return db_url

def get_url_by_short_code(db, short_code: str):
    return db.query(URL).filter(URL.short_code == short_code).first()