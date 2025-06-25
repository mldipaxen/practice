from pydantic import BaseModel, field_validator
from typing import Optional
from datetime import datetime

class UrlCreate(BaseModel):
    original_url: str

class URL(BaseModel):
    id: int
    original_url: str
    short_code: str
    clicks: int
    created_at: Optional[datetime] = None  
    @field_validator('created_at', mode='before')
    def parse_datetime(cls, value):
        if value is None:
            return datetime.utcnow()  # Значение по умолчанию
        return value

class Config:
    from_attributes = True  
    json_encoders = {
        datetime: lambda v: v.isoformat() 
    }