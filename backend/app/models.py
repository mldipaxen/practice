from sqlalchemy import Column, Integer, String, TIMESTAMP
from .database import Base
from datetime import datetime
from sqlalchemy import Column, DateTime
class URL(Base):
    __tablename__ = "urls"

    id = Column(Integer, primary_key=True, index=True)
    original_url = Column(String, index=True)
    short_code = Column(String(10), unique=True, index=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)
    clicks = Column(Integer, default=0)