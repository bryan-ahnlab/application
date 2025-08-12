from app.database import SessionLocal
from app.models import Item
from sqlalchemy import text


def view_all_items():
    db = SessionLocal()
    try:
        items = db.query(Item).all()
        print(f"\n📋 총 {len(items)}개의 아이템이 있습니다:\n")

        if not items:
            print("❌ 데이터베이스에 아이템이 없습니다.")
            return

        for item in items:
            print(f"ID: {item.id}")
            print(f"제목: {item.title}")
            print(f"설명: {item.description or '설명 없음'}")
            print(f"생성일: {item.created_at}")
            print(f"수정일: {item.updated_at}")
            print("-" * 50)
    finally:
        db.close()


def view_db_info():
    db = SessionLocal()
    try:
        # SQLite 데이터베이스 정보 조회
        result = db.execute(text("SELECT name FROM sqlite_master WHERE type='table';"))
        tables = result.fetchall()

        print("🗄️ 데이터베이스 정보:")
        print(f"테이블 목록: {[table[0] for table in tables]}")

        if "items" in [table[0] for table in tables]:
            result = db.execute(text("SELECT COUNT(*) FROM items;"))
            count = result.fetchone()[0]
            print(f"items 테이블의 레코드 수: {count}")

    finally:
        db.close()


if __name__ == "__main__":
    print("데이터베이스 조회를 시작합니다...")
    view_db_info()
    view_all_items()
