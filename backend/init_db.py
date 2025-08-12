from app.database import engine
from app.models import Base
from app.crud import create_item
from app.schemas import ItemCreate
from app.database import SessionLocal


def init_db():
    # 데이터베이스 테이블 생성
    Base.metadata.create_all(bind=engine)
    print("✅ 데이터베이스 테이블이 생성되었습니다.")


def create_sample_data():
    db = SessionLocal()
    try:
        # 샘플 데이터 생성
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

        print("✅ 샘플 데이터가 생성되었습니다.")
    finally:
        db.close()


if __name__ == "__main__":
    print("데이터베이스 초기화를 시작합니다...")
    init_db()
    create_sample_data()
    print("🎉 데이터베이스 초기화가 완료되었습니다!")
