CREATE DATABASE test;
USE test;

-- 지역 테이블
CREATE TABLE regions (
    region_id INT AUTO_INCREMENT PRIMARY KEY,
    region_name VARCHAR(100) UNIQUE NOT NULL
);

-- 사용자 테이블
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    user_name VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 미션 테이블
CREATE TABLE missions (
    mission_id INT AUTO_INCREMENT PRIMARY KEY,
    region_id INT,
    mission_status ENUM('수행 중', '완료') NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (region_id) REFERENCES regions(region_id)
);

-- 가게 테이블
CREATE TABLE stores (
    store_id INT AUTO_INCREMENT PRIMARY KEY,
    store_name VARCHAR(100) NOT NULL,
    region_id INT,
    store_address VARCHAR(255),
    FOREIGN KEY (region_id) REFERENCES regions(region_id)
);

CREATE TABLE user_points (
    point_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    points INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE user_missions (
    user_mission_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    mission_id INT,
    store_id INT,
    point_id INT, -- 포인트 아이디 추가
    status ENUM('진행 중', '완료') NOT NULL,
    completed_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (mission_id) REFERENCES missions(mission_id),
    FOREIGN KEY (store_id) REFERENCES stores(store_id),
    FOREIGN KEY (point_id) REFERENCES user_points(point_id) -- 포인트 아이디 외래 키 추가
);


DELIMITER //

CREATE TRIGGER after_user_mission_complete
AFTER UPDATE ON user_missions
FOR EACH ROW
BEGIN
    DECLARE completed_mission_count INT DEFAULT 0; -- 변수를 선언하고 초기화

    -- 완료된 미션이 아닌 경우는 무시
    IF NEW.status = '완료' THEN
        -- 해당 사용자의 완료된 미션 수 조회
        SELECT COUNT(*)
        INTO completed_mission_count
        FROM user_missions
        WHERE user_id = NEW.user_id
          AND status = '완료'
          AND mission_id IN (
              SELECT mission_id FROM missions WHERE region_id = (
                  SELECT region_id FROM stores WHERE store_id = NEW.store_id
              )
          );

        -- 완료된 미션 수가 10개인지 확인
        IF completed_mission_count = 10 THEN
            -- 포인트 부여
            INSERT INTO user_points (user_id, points, updated_at)
            VALUES (NEW.user_id, 1000, CURRENT_TIMESTAMP)
            ON DUPLICATE KEY UPDATE points = points + 1000, updated_at = CURRENT_TIMESTAMP;
        END IF;
    END IF;
END //

DELIMITER ;


-- 지역 데이터 삽입
INSERT INTO regions (region_name) VALUES 
('서울'), 
('부산'), 
('대구');

-- 사용자 데이터 삽입
INSERT INTO users (username, password, email) VALUES 
('user1', 'password1', 'user1@example.com');

-- 미션 데이터 삽입
INSERT INTO missions (region_id, mission_status, description) VALUES 
(1, '수행 중', '서울 미션 1'),
(1, '수행 중', '서울 미션 2'),
(1, '수행 중', '서울 미션 3'),
(1, '수행 중', '서울 미션 4'),
(1, '수행 중', '서울 미션 5'),
(1, '수행 중', '서울 미션 6'),
(1, '수행 중', '서울 미션 7'),
(1, '수행 중', '서울 미션 8'),
(1, '수행 중', '서울 미션 9'),
(1, '수행 중', '서울 미션 10');

-- 사용자 미션 데이터 삽입 (10개 미션 모두 완료)
INSERT INTO user_missions (user_id, mission_id, store_id, point_id, status, completed_at) VALUES 
(1, 1, NULL, NULL, '완료', NOW()),
(1, 2, NULL, NULL, '완료', NOW()),
(1, 3, NULL, NULL, '완료', NOW()),
(1, 4, NULL, NULL, '완료', NOW()),
(1, 5, NULL, NULL, '완료', NOW()),
(1, 6, NULL, NULL, '완료', NOW()),
(1, 7, NULL, NULL, '완료', NOW()),
(1, 8, NULL, NULL, '완료', NOW()),
(1, 9, NULL, NULL, '완료', NOW()),
(1, 10, NULL, NULL, '완료', NOW());

-- 포인트 추가 확인
CALL AddPointsForCompletedMissions(1, 1); -- 사용자 ID 1, 지역 ID 1

-- 포인트 확인
SELECT * FROM user_points WHERE user_id = 1;
