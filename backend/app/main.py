from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, schemas, services
from .database import SessionLocal, engine
from starlette.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from fastapi.encoders import jsonable_encoder

models.Base.metadata.create_all(bind=engine)

app = FastAPI()



app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/urls/", response_model=schemas.URL)
def create_url(url: schemas.UrlCreate, db: Session = Depends(get_db)):
    db_url = models.URL(
        original_url=url.original_url,
        short_code=services.create_short_code(),
        created_at=datetime.utcnow()  
    )
    db.add(db_url)
    db.commit()
    db.refresh(db_url)
    return jsonable_encoder(db_url)  

@app.get("/urls/", response_model=list[schemas.URL])
def read_urls(db: Session = Depends(get_db)):
    urls = db.query(models.URL).all()
    return jsonable_encoder(urls) 

@app.get("/{short_code}")
async def redirect_url(short_code: str, db: Session = Depends(get_db)):
    url = db.query(models.URL).filter(models.URL.short_code == short_code).first()
    if not url:
        raise HTTPException(status_code=404, detail="URL not found")
    

    url.clicks += 1
    db.commit()
    

    return RedirectResponse(url.original_url, status_code=302)

@app.get("/urls/{url_id}", response_model=schemas.URL)
def read_url(url_id: int, db: Session = Depends(get_db)):
    db_url = db.query(models.URL).filter(models.URL.id == url_id).first()
    if not db_url:
        raise HTTPException(status_code=404, detail="URL not found")
    return db_url


@app.delete("/urls/{url_id}")
def delete_url(url_id: int, db: Session = Depends(get_db)):
    db_url = db.query(models.URL).filter(models.URL.id == url_id).first()
    if not db_url:
        raise HTTPException(status_code=404, detail="URL not found")
    
    db.delete(db_url)
    db.commit()
    return {"message": "URL deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)