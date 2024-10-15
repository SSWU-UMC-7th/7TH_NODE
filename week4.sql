-- 데이터베이스 사용 (선택한 데이터베이스를 사용)
USE new_schema;


-- 간단한 테이블 생성
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 기본 데이터 삽입
INSERT INTO users (name, email) 
VALUES 
('chaewon', 'alice@example.com'),
('winny', 'winny@example.com');
