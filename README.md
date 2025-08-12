# Application - Moon Repo

이 프로젝트는 Moon Repo를 사용하여 Frontend(NextJS)와 Backend(FastAPI)를 함께 관리하는 monorepo 구조입니다.

## 프로젝트 구조

```
application/
├── frontend/          # NextJS Frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── moon.yml
├── backend/           # FastAPI Backend
│   ├── app/
│   ├── main.py
│   ├── requirements.txt
│   └── moon.yml
├── moon.yml          # Moon Repo 루트 설정
└── README.md
```

## 기술 스택

### Frontend

- **Framework**: Next.js 15.4.6
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm

### Backend

- **Framework**: FastAPI
- **Language**: Python 3.8+
- **Database**: SQLAlchemy (SQLite 기본)
- **Package Manager**: pip

## 시작하기

### 1. Moon 설치

```bash
# Moon 설치 (macOS)
curl -fsSL https://moonrepo.dev/install.sh | bash

# 또는 npm을 통해 설치
npm install -g @moonrepo/cli
```

### 2. 의존성 설치

```bash
# 모든 프로젝트의 의존성 설치
moon install

# 또는 개별 프로젝트 설치
moon install frontend
moon install backend
```

### 3. 개발 서버 실행

```bash
# 모든 프로젝트 개발 서버 실행
moon run dev

# 또는 개별 프로젝트 실행
moon run frontend:dev
moon run backend:dev
```

### 4. 빌드

```bash
# 모든 프로젝트 빌드
moon run build

# 또는 개별 프로젝트 빌드
moon run frontend:build
moon run backend:build
```

## API 엔드포인트

### Items API

- `GET /api/items/` - 아이템 목록 조회
- `POST /api/items/` - 아이템 생성
- `GET /api/items/{id}` - 특정 아이템 조회
- `PUT /api/items/{id}` - 아이템 수정
- `DELETE /api/items/{id}` - 아이템 삭제

### Health Check

- `GET /health` - 서버 상태 확인

## 환경 변수

### Frontend

- `NEXT_PUBLIC_API_URL` - Backend API URL (기본값: http://localhost:8000)

### Backend

- `DATABASE_URL` - 데이터베이스 연결 URL (기본값: sqlite:///./app.db)

## 개발 가이드

### Frontend 개발

```bash
cd frontend
npm run dev
```

### Backend 개발

```bash
cd backend
python main.py
```

### 데이터베이스 마이그레이션

```bash
cd backend
alembic upgrade head
```

## 배포

### Frontend 배포

```bash
moon run frontend:build
moon run frontend:start
```

### Backend 배포

```bash
moon run backend:install
moon run backend:dev
```

## 라이센스

MIT License
