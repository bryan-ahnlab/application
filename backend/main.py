from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
from datetime import datetime

# FastAPI 앱 인스턴스 생성
app = FastAPI(
    title="Application API",
    description="FastAPI Backend for Application",
    version="1.0.0",
)

# CORS 미들웨어 설정 (Frontend와 통신을 위해)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # NextJS 개발 서버
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Pydantic 모델들
class Item(BaseModel):
    id: Optional[int] = None
    title: str
    description: Optional[str] = None
    created_at: Optional[datetime] = None


class ItemCreate(BaseModel):
    title: str
    description: Optional[str] = None


# 데이터베이스 사용 (SQLite)


# 루트 엔드포인트
@app.get("/")
async def root():
    return {"message": "Welcome to Application API", "version": "1.0.0"}


# 데이터베이스 초기화 엔드포인트
@app.post("/init-db")
async def init_database():
    from app.database import engine
    from app.models import Base
    from app.crud import create_item
    from app.schemas import ItemCreate
    from app.database import SessionLocal

    # 데이터베이스 테이블 생성
    Base.metadata.create_all(bind=engine)

    # 샘플 데이터 생성
    db = SessionLocal()
    try:
        sample_items = [
            ItemCreate(
                title="첫 번째 아이템", description="이것은 첫 번째 샘플 아이템입니다."
            ),
            ItemCreate(
                title="두 번째 아이템", description="이것은 두 번째 샘플 아이템입니다."
            ),
            ItemCreate(
                title="세 번째 아이템", description="이것은 세 번째 샘플 아이템입니다."
            ),
        ]

        for item in sample_items:
            create_item(db, item)

        return {
            "message": "데이터베이스가 초기화되었습니다.",
            "items_created": len(sample_items),
        }
    finally:
        db.close()


# 헬스체크 엔드포인트
@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now()}


# 아이템 목록 조회
@app.get("/api/items/", response_model=List[Item])
async def get_items():
    from app.database import SessionLocal
    from app.crud import get_items as crud_get_items

    db = SessionLocal()
    try:
        items = crud_get_items(db)
        return items
    finally:
        db.close()


# 아이템 생성
@app.post("/api/items/", response_model=Item)
async def create_item(item: ItemCreate):
    from app.database import SessionLocal
    from app.crud import create_item as crud_create_item

    db = SessionLocal()
    try:
        db_item = crud_create_item(db, item)
        return db_item
    finally:
        db.close()


# 아이템 조회
@app.get("/api/items/{item_id}", response_model=Item)
async def get_item(item_id: int):
    from app.database import SessionLocal
    from app.crud import get_item as crud_get_item

    db = SessionLocal()
    try:
        db_item = crud_get_item(db, item_id)
        if db_item is None:
            raise HTTPException(status_code=404, detail="Item not found")
        return db_item
    finally:
        db.close()


# 아이템 수정
@app.put("/api/items/{item_id}", response_model=Item)
async def update_item(item_id: int, item_update: ItemCreate):
    from app.database import SessionLocal
    from app.crud import update_item as crud_update_item

    db = SessionLocal()
    try:
        db_item = crud_update_item(db, item_id, item_update)
        if db_item is None:
            raise HTTPException(status_code=404, detail="Item not found")
        return db_item
    finally:
        db.close()


# 아이템 삭제
@app.delete("/api/items/{item_id}")
async def delete_item(item_id: int):
    from app.database import SessionLocal
    from app.crud import delete_item as crud_delete_item

    db = SessionLocal()
    try:
        success = crud_delete_item(db, item_id)
        if not success:
            raise HTTPException(status_code=404, detail="Item not found")
        return {"message": f"Item {item_id} deleted successfully"}
    finally:
        db.close()


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
