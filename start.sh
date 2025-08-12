#!/bin/bash

echo "🚀 Docker 환경을 시작합니다..."

# 기존 컨테이너 정리
echo "🧹 기존 컨테이너를 정리합니다..."
docker compose down

# 이미지 빌드
echo "🔨 Docker 이미지를 빌드합니다..."
docker compose build

# 서비스 시작
echo "🌟 서비스를 시작합니다..."
docker compose up -d

# 서비스 상태 확인
echo "📊 서비스 상태를 확인합니다..."
docker compose ps

echo ""
echo "✅ 모든 서비스가 시작되었습니다!"
echo ""
echo "🌐 접속 URL:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:8000"
echo "   API 문서: http://localhost:8000/docs"
echo ""
echo "📝 로그 확인:"
echo "   docker compose logs -f"
echo ""
echo "🛑 서비스 중지:"
echo "   docker compose down" 