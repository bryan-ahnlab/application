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


# 임시 데이터 저장소 (실제로는 데이터베이스 사용)
items_db = []
item_id_counter = 1


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
@app.get("/api/items", response_model=List[Item])
async def get_items():
    return items_db


# 아이템 생성
@app.post("/api/items", response_model=Item)
async def create_item(item: ItemCreate):
    global item_id_counter

    new_item = Item(
        id=item_id_counter,
        title=item.title,
        description=item.description,
        created_at=datetime.now(),
    )

    items_db.append(new_item)
    item_id_counter += 1

    return new_item


# 아이템 조회
@app.get("/api/items/{item_id}", response_model=Item)
async def get_item(item_id: int):
    for item in items_db:
        if item.id == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")


# 아이템 수정
@app.put("/api/items/{item_id}", response_model=Item)
async def update_item(item_id: int, item_update: ItemCreate):
    for i, item in enumerate(items_db):
        if item.id == item_id:
            items_db[i] = Item(
                id=item_id,
                title=item_update.title,
                description=item_update.description,
                created_at=item.created_at,
            )
            return items_db[i]
    raise HTTPException(status_code=404, detail="Item not found")


# 아이템 삭제
@app.delete("/api/items/{item_id}")
async def delete_item(item_id: int):
    for i, item in enumerate(items_db):
        if item.id == item_id:
            deleted_item = items_db.pop(i)
            return {"message": f"Item {item_id} deleted successfully"}
    raise HTTPException(status_code=404, detail="Item not found")


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
