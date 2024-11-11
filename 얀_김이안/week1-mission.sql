-- 테이블 생성 SQL - User
CREATE TABLE User
(
    `user_id`      INT             NOT NULL    AUTO_INCREMENT COMMENT 'user_id', 
    `username`     VARCHAR(10)     NOT NULL    COMMENT 'username', 
    `password`     VARCHAR(50)     NOT NULL    COMMENT 'password', 
    `email`        VARCHAR(100)    NOT NULL    COMMENT 'email', 
    `signup_date`  TIMESTAMP       NOT NULL    COMMENT 'signup_date', 
     PRIMARY KEY (user_id)
);

-- 테이블 생성 SQL - User_Mission
CREATE TABLE User_Mission
(
    `user_mission_id`  INT            NOT NULL    AUTO_INCREMENT COMMENT 'user_mission_id', 
    `user_id`          INT            NOT NULL    COMMENT 'user_id', 
    `mission_id`       INT            NOT NULL    COMMENT 'mission_id', 
    `status`           VARCHAR(20)    NOT NULL    COMMENT 'status', 
    `completion_date`  TIMESTAMP      NOT NULL    COMMENT 'completion_date', 
     PRIMARY KEY (user_mission_id)
);

-- 테이블 생성 SQL - Mission
CREATE TABLE Mission
(
    `mission_id`     INT            NOT NULL    AUTO_INCREMENT COMMENT 'mission_id', 
    `title`          VARCHAR(50)    NOT NULL    COMMENT 'title', 
    `description`    TEXT           NULL        COMMENT 'description', 
    `points_reward`  INT            NOT NULL    COMMENT 'points_reward', 
    `is_completed`   TINYTEXT       NOT NULL    COMMENT 'is_completed', 
     PRIMARY KEY (mission_id)
);

-- Foreign Key 설정 SQL - User_Mission(mission_id) -> Mission(mission_id)
ALTER TABLE User_Mission
    ADD CONSTRAINT FK_User_Mission_mission_id_Mission_mission_id FOREIGN KEY (mission_id)
        REFERENCES Mission (mission_id) ON DELETE RESTRICT ON UPDATE RESTRICT;
        
-- Foreign Key 설정 SQL - User_Mission(user_id) -> User(user_id)
ALTER TABLE User_Mission
    ADD CONSTRAINT FK_User_Mission_user_id_User_user_id FOREIGN KEY (user_id)
        REFERENCES User (user_id) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- 예시 데이터 삽입해보기
INSERT INTO User (username, password, email, signup_date) 
VALUES ('ian', '1234', 'iann@email.com', NOW());

INSERT INTO Mission (title, description, points_reward, is_completed) 
VALUES ('first mission', 'clap your hands twice', 100, '0');

INSERT INTO User_Mission (user_id, mission_id, status, completion_date) 
VALUES (1, 1, 'not yet', NOW());

-- 해당 테이블에 예시 데이터 입력 여부 확인해보기
SELECT * FROM User;
SELECT * FROM Mission;
SELECT * FROM User_Mission;