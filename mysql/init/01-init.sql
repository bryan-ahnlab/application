-- MySQL 데이터베이스 초기화 스크립트

-- 데이터베이스 생성 (이미 docker-compose에서 생성됨)
-- CREATE DATABASE IF NOT EXISTS application_db;

-- 사용자 권한 설정
GRANT ALL PRIVILEGES ON application_db.* TO 'app_user'@'%';
FLUSH PRIVILEGES;

-- 테이블 생성 (SQLAlchemy가 자동으로 생성하므로 주석 처리)
-- CREATE TABLE IF NOT EXISTS items (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     title VARCHAR(255) NOT NULL,
--     description TEXT,
--     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
--     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );

-- 샘플 데이터 삽입 (선택사항)
-- INSERT INTO items (title, description) VALUES 
--     ('첫 번째 아이템', 'MySQL에서 생성된 첫 번째 아이템입니다.'),
--     ('두 번째 아이템', 'MySQL에서 생성된 두 번째 아이템입니다.'); 