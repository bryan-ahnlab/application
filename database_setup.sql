-- MySQL Database Setup Script
-- Run this script to create the database and user

-- Create database
CREATE DATABASE IF NOT EXISTS app_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user and grant privileges
CREATE USER IF NOT EXISTS 'bryan'@'localhost' IDENTIFIED BY '123456789a';
GRANT ALL PRIVILEGES ON app_db.* TO 'bryan'@'localhost';
FLUSH PRIVILEGES;

-- Use the database
USE app_db;

-- Create tables (these will be created by SQLAlchemy, but here's the structure)
-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_username (username)
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    author_id INT NOT NULL,
    is_published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_author_id (author_id),
    INDEX idx_created_at (created_at)
);

-- Insert sample data
INSERT INTO users (email, username, hashed_password, is_active) VALUES
('admin@example.com', 'admin', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJhKj8G', TRUE),
('user@example.com', 'user', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4tbQJhKj8G', TRUE);

-- Note: The hashed password above is for 'password123'
-- You can generate your own using: python -c "import bcrypt; print(bcrypt.hashpw('your_password'.encode('utf-8'), bcrypt.gensalt()).decode('utf-8'))"

INSERT INTO posts (title, content, author_id, is_published) VALUES
('Welcome to our Blog', 'This is the first post on our blog platform.', 1, TRUE),
('Getting Started', 'Learn how to use our platform effectively.', 1, TRUE),
('User Guide', 'A comprehensive guide for new users.', 2, FALSE);

-- Show created tables
SHOW TABLES;

-- Show sample data
SELECT * FROM users;
SELECT * FROM posts; 