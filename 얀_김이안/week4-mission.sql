-- 전체 쿼리

CREATE DATABASE 4주차;
USE 4주차;

-- 테이블 생성 SQL - User
CREATE TABLE User
(
    `user_id`      INT             NOT NULL    AUTO_INCREMENT COMMENT 'user_id', 
    `username`     VARCHAR(10)     NOT NULL    COMMENT 'username', 
    `password`     VARCHAR(50)     NOT NULL    COMMENT 'password', 
    `email`        VARCHAR(100)    NOT NULL    COMMENT 'email', 
    `signup_date`  TIMESTAMP       NOT NULL    COMMENT 'signup_date',
    `user_region`  VARCHAR(50)         NULL	   COMMENT 'user_region',
    `phone_number` VARCHAR(20)         NULL    COMMENT 'phone_number',
     PRIMARY KEY (user_id)
);

SELECT * FROM User;
