-- 예시 데이터 삽입해보기 (데이터가 너무 적어서 더 추가!)
INSERT INTO User (username, password, email, signup_date) 
VALUES ('jay', '0214', 'jay@smtown.com', NOW()),
			 ('wini', '0000', 'wini@gmail.com', NOW()),
       ('lini', '1111', 'llll@naver.com', NOW()),
       ('susu', '0909', 'oksusu@naver.com', NOW());

INSERT INTO Mission (title, description, points_reward, is_completed) 
VALUES ('second mission', 'go to suharu', 200, 1),
       ('third mission', 'go to An Alley Cheif', 200, 1),
       ('fourth mission', 'go to rarameonga', 200, 0),
       ('fifth mission', 'go to ondam', 200, 1),
       ('sixth mission', 'go to togosalad', 200, 1),
       ('seventh mission', 'go to pizzahut', 200, 0);


INSERT INTO User_Mission (user_id, mission_id, status, completion_date) 
VALUES (2, 2, 'complete', NOW()),
       (3, 3, 'ongoing', NOW()),
       (4, 5, 'not yet', NOW()),
       (5, 6, 'complete', NOW()),
       (1, 7, 'ongoing', NOW());

-- 테이블 생성 SQL - Review
CREATE TABLE Review
(
    `review_id`        INT          NOT NULL    AUTO_INCREMENT COMMENT 'review_id', 
    `user_mission_id`  INT          NOT NULL    COMMENT 'user_mission_id', 
    `review_text`      TEXT         NULL    COMMENT 'review_text', 
    `rating`           INT          NOT NULL    COMMENT 'rating', 
    `review_date`      TIMESTAMP    NOT NULL    COMMENT 'review_date', 
     PRIMARY KEY (review_id)
);

-- 지역과 관련된 부분을 1주차때 고려하지 않아서 지역에 대한 필드가 없다.
-- 따로 추가하자!

-- User 테이블 수정
ALTER TABLE User
ADD COLUMN `user_region` VARCHAR(50) NULL;

-- Mission 테이블 수정
ALTER TABLE Mission
ADD COLUMN `region_id` INT NOT NULL;

-- Region 테이블 생성
CREATE TABLE Region (
    `region_id` INT NOT NULL AUTO_INCREMENT,
    `region_name` VARCHAR(50) NOT NULL,
    PRIMARY KEY (region_id)
);


-- 샘플 지역 데이터 추가
INSERT INTO Region (region_name) 
VALUES ('안암동'), ('홍대'), ('강남'), ('신촌'), ('잠실');

-- 미션에 지역 ID 매핑 예시 데이터
UPDATE Mission 
SET region_id = (SELECT region_id
				 FROM Region 
                 WHERE region_name = '안암동') 
                 WHERE mission_id = 1;
UPDATE Mission 
SET region_id = (SELECT region_id 
				 FROM Region 
                 WHERE region_name = '홍대') 
                 WHERE mission_id = 2;
UPDATE Mission 
SET region_id = (SELECT region_id 
				 FROM Region 
                 WHERE region_name = '강남') 
                 WHERE mission_id = 3;
UPDATE Mission 
SET region_id = (SELECT region_id 
				 FROM Region 
                 WHERE region_name = '신촌') 
                 WHERE mission_id = 4;

-- Region 테이블과의 외래 키 설정
ALTER TABLE Mission
ADD CONSTRAINT FK_Mission_region_id_Region_region_id
FOREIGN KEY (region_id) REFERENCES Region (region_id)
ON DELETE RESTRICT ON UPDATE RESTRICT;

-- User_Mission 테이블과 외래 키 설정
ALTER TABLE Review
ADD CONSTRAINT FK_Review_user_mission_id_User_Mission_user_mission_id
FOREIGN KEY (user_mission_id) REFERENCES User_Mission (user_mission_id)
ON DELETE CASCADE ON UPDATE CASCADE;

-- 사용자별 선택한 지역 추가 예시 데이터
UPDATE User
SET user_region = CASE
    WHEN username = 'ian' THEN '안암동'
    WHEN username = 'jay' THEN '홍대'
    WHEN username = 'wini' THEN '강남'
    WHEN username = 'lini' THEN '신촌'
    WHEN username = 'susu' THEN '잠실'
    ELSE user_region  -- 변경할 지역이 없는 경우 기존 값(현재는 NULL임)을 유지
END;

-- User 테이블에 phone_number 필드 추가
ALTER TABLE User
ADD COLUMN phone_number VARCHAR(20) NULL;

-- User 테이블에 전화번호 내용 추가
UPDATE User
SET phone_number = CASE
    WHEN username = 'ian' THEN '01036946460'
    WHEN username = 'wini' THEN '01023456789'
    WHEN username = 'susu' THEN '01022223333'
    ELSE phone_number
END;