-- 미션 1

SELECT 
    UM.user_mission_id,
    UM.mission_id,
    
    (SELECT title 
     FROM Mission M 
     WHERE M.mission_id = UM.mission_id) AS m_title,
     
    (SELECT description 
     FROM Mission M 
     WHERE M.mission_id = UM.mission_id) AS m_description,
     
    UM.status,
    UM.completion_date,
    
    (SELECT points_reward 
     FROM Mission M 
     WHERE M.mission_id = UM.mission_id) AS points_reward
     
FROM 
    User_Mission AS UM
    
WHERE 
    UM.user_id = 1  -- 유저번호가 1인 유저가 '나'라고 하기
AND 
    UM.status IN ('ongoing', 'complete')  -- 미션 진행 중 또는 미션 완료 상태만 조회하기
    
-- 커서 베이스 페이징하는 부분 (내 데이터에서는 많은 데이터가 있지 않아서... 확인이 되지는 않는다)
# completion_date가 '2024-09-30 16:58:42' 이후의 데이터
# 또는 동일한 completion_date에서 user_mission_id가 3보다 큰 데이터만 선택

AND 
    (UM.completion_date, UM.user_mission_id) > ('2024-09-30 16:58:42', 3)

LIMIT 10;  -- 다음 10개 데이터 조회 --> 이건 확인이 불가하다

-- 미션2
INSERT INTO Review (user_mission_id, review_text, rating, review_date)
VALUES (1, 'Its so funny haha', 4, NOW()),
			 (2, 'Atmosphere is really nice', 4, NOW()),
       (3, 'Taste so gooooooooood', 5, NOW()),
       (4, 'Its not my style', 2, NOW());
       
       -- 쿼리 다 짜고 보니..? 댓글 부분이랑 사진 첨부하는 부분도 데이터로 설계해야 하는건지...?
       -- 모르겠다..하하..

-- 미션3

SELECT 
    M.mission_id,
    M.title AS m_title,
    M.description AS m_description,
    M.points_reward,
    R.region_name,
    COALESCE(UM.status, 'not tried') AS m_status  -- 사용자가 도전하지 않은 경우
FROM 
    Mission M
JOIN 
    Region R ON M.region_id = R.region_id  		  -- 미션이 속한 지역과 연결
JOIN 
    User U ON U.user_region = R.region_name 	  -- 사용자가 선택한 지역과 미션의 지역이 일치하는지 확인
LEFT JOIN 
    User_Mission UM ON M.mission_id = UM.mission_id 
					AND UM.user_id = U.user_id 	  -- 미션과 사용자 미션 정보를 조인하여 사용자별 상태 확인
WHERE 
    U.user_id = 3         -- 유저번호가 3인 유저
AND 
    (UM.status IS NULL OR UM.status = 'ongoing')  -- 완료된 미션 제외하고 미도전 또는 진행 중 상태만 조회

-- 커서 베이스 페이징하는 부분 (내 데이터에서는 많은 데이터가 있지 않아서... 확인이 되지는 않는다)
    
AND 
    M.mission_id > 1  -- 이전 페이지의 마지막 mission_id를 기준으로 다음 데이터를 가져옴
ORDER BY 
    M.mission_id ASC
LIMIT 10;           -- 다음 10개 데이터 조회

-- 미션4

SELECT 
    U.username AS nickname,             -- 사용자 닉네임 (이름)
    U.email,                            -- 이메일
    
    CASE 
        WHEN U.phone_number IS NOT NULL THEN 'certified'
        ELSE 'not certified'
    END AS phone_status,                -- 휴대폰 번호 인증 여부
    
    COALESCE(SUM(R.points_reward), 0) AS total_points,  -- 누적 포인트 (적립된 포인트 합계)
    COUNT(DISTINCT RV.review_id) AS review_count        -- 작성한 리뷰 개수

FROM 
    User U

LEFT JOIN 
    User_Mission UM ON U.user_id = UM.user_id          -- 사용자와 연결된 미션 정보
LEFT JOIN 
    Mission M ON UM.mission_id = M.mission_id          -- 미션 정보 연결
LEFT JOIN 
    Review RV ON UM.user_mission_id = RV.user_mission_id -- User_Mission과 Review 테이블을 user_mission_id를 통해 연결
LEFT JOIN 
    (SELECT 
        UM.user_id, SUM(M.points_reward) AS points_reward
     
     FROM 
        User_Mission UM
     
     JOIN 
        Mission M ON UM.mission_id = M.mission_id
     
     GROUP BY 
        UM.user_id) AS R ON U.user_id = R.user_id      -- 적립된 포인트 합계

WHERE 
    U.user_id = 1