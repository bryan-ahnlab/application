# Full-Stack Application

NextJS + FastAPI + MySQL + Moonrepo를 사용한 풀스택 애플리케이션입니다.

## 프로젝트 구조

```
application/
├── frontend/          # NextJS (TypeScript)
├── backend/           # FastAPI (Python)
├── moon.yml          # Moonrepo 설정
├── database_setup.sql # MySQL 설정 스크립트
└── README.md
```

## 기술 스택

### Frontend

- **NextJS 15** - React 프레임워크
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 스타일링
- **Axios** - HTTP 클라이언트
- **React Hook Form** - 폼 관리
- **Zustand** - 상태 관리

### Backend

- **FastAPI** - Python 웹 프레임워크
- **SQLAlchemy** - ORM
- **PyMySQL** - MySQL 드라이버
- **Pydantic** - 데이터 검증
- **JWT** - 인증

### Database

- **MySQL** - 관계형 데이터베이스

### Development Tools

- **Moonrepo** - 모노레포 관리

## 설치 및 실행

### 1. 사전 요구사항

- Node.js 18+
- Python 3.11+
- MySQL 8.0+
- Moonrepo CLI

### 2. Moonrepo 설치

```bash
# Moonrepo CLI 설치
curl -fsSL https://moonrepo.dev/install.sh | bash

# 또는 npm을 통해 설치
npm install -g @moonrepo/cli
```

### 3. 데이터베이스 설정

```bash
# MySQL에 접속
mysql -u root -p

# 데이터베이스 설정 스크립트 실행
source database_setup.sql
```

### 4. 의존성 설치

```bash
# Moonrepo를 통해 모든 프로젝트의 의존성 설치
moon install

# 또는 개별적으로 설치
cd frontend && npm install
cd ../backend && pip install -r requirements.txt
```

### 5. 환경 변수 설정

#### Backend (.env 파일 생성)

```bash
cd backend
cp .env.example .env
```

`.env` 파일 내용:

```env
DATABASE_URL=mysql+pymysql://bryan:123456789a@localhost:3306/app_db
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
HOST=0.0.0.0
PORT=8000
```

#### Frontend (.env.local 파일 생성)

```bash
cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
```

### 6. 개발 서버 실행

```bash
# Moonrepo를 통해 모든 서비스 실행
moon run dev

# 또는 개별적으로 실행
# Backend
cd backend && moon run dev

# Frontend (새 터미널에서)
cd frontend && moon run dev
```

## API 엔드포인트

### 인증

- `POST /token` - 로그인
- `GET /users/me/` - 현재 사용자 정보

### 사용자

- `POST /users/` - 사용자 등록
- `GET /users/` - 사용자 목록
- `GET /users/{user_id}` - 특정 사용자 정보

### 게시물

- `GET /posts/` - 게시물 목록
- `POST /posts/` - 게시물 생성
- `GET /posts/{post_id}` - 특정 게시물
- `PUT /posts/{post_id}` - 게시물 수정
- `DELETE /posts/{post_id}` - 게시물 삭제
- `GET /users/{user_id}/posts/` - 사용자의 게시물

## Moonrepo 명령어

```bash
# 모든 프로젝트 빌드
moon run build

# 모든 프로젝트 테스트
moon run test

# 모든 프로젝트 린트
moon run lint

# 특정 프로젝트만 실행
moon run frontend:dev
moon run backend:dev

# 의존성 그래프 확인
moon show graph
```

## 개발 가이드

### Frontend 개발

- `frontend/src/` - 소스 코드
- `frontend/src/components/` - React 컴포넌트
- `frontend/src/lib/` - 유틸리티 함수
- `frontend/src/store/` - 상태 관리

### Backend 개발

- `backend/main.py` - FastAPI 애플리케이션
- `backend/models.py` - SQLAlchemy 모델
- `backend/schemas.py` - Pydantic 스키마
- `backend/crud.py` - 데이터베이스 작업
- `backend/auth.py` - 인증 로직

## 배포

### Frontend 배포

```bash
cd frontend
moon run build
# 빌드된 파일을 Vercel, Netlify 등에 배포
```

### Backend 배포

```bash
cd backend
# Docker 또는 클라우드 서비스에 배포
```

## 문제 해결

### MySQL 연결 오류

- MySQL 서비스가 실행 중인지 확인
- 사용자 권한 확인
- 방화벽 설정 확인

### CORS 오류

- Backend의 CORS 설정 확인
- Frontend URL이 올바른지 확인

### 인증 오류

- JWT 토큰이 올바른지 확인
- 토큰 만료 시간 확인

## 라이선스

MIT License
