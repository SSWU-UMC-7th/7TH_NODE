--내가 진행중, 진행 완료한 미션 모아서 보는 쿼리(페이징 포함)

SELECT 
    um.user_mission_id,
    u.username AS username, -- 컬럼명 수정
    m.description AS mission_description,
    s.store_name AS store_name,
    um.status,
    COALESCE(um.completed_at, '진행 중') AS completed_at, -- 진행 중인 경우 NULL 대신 '진행 중' 표시
    up.points AS earned_points
FROM user_missions um
JOIN users u ON um.user_id = u.user_id
JOIN missions m ON um.mission_id = m.mission_id
LEFT JOIN stores s ON um.store_id = s.store_id -- INNER JOIN을 LEFT JOIN으로 변경
LEFT JOIN user_points up ON um.point_id = up.point_id
WHERE um.user_id = 1  -- 특정 사용자 ID
ORDER BY um.status, um.completed_at DESC
LIMIT 10 OFFSET 0;



--리뷰 작성하는 쿼리 (리뷰 테이블 설계 포함)

-- 리뷰 테이블 
CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT, -- 리뷰를 작성한 사용자
    store_id INT, -- 리뷰 대상 가게
    rating INT CHECK(rating BETWEEN 1 AND 5), -- 평점 (1~5)
    review_text TEXT, -- 리뷰 내용
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 리뷰 작성 시점
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (store_id) REFERENCES stores(store_id)
);


-- 리뷰 작성 (사진 제외)
INSERT INTO reviews (user_id, store_id, rating, review_text)
VALUES (1, 2, 5, '음식이 너무 맛있었어요. 또 방문할게요!');

--홈 화면 쿼리(현재 선택 된 지역에서 도전이 가능한 미션 목록, 페이징 포함)

--offset based 페이징
SELECT 
    m.mission_id,
    s.store_name,
    m.description,
    m.created_at,
    m.mission_status,
    IFNULL(up.points, 0) AS points, -- 미션 완료 시 포인트 (없으면 0으로 표시)
    DATEDIFF(NOW(), m.created_at) AS days_left -- 미션 생성 후 남은 일수 (예: 7일 제한 시 계산용)
FROM missions m
JOIN stores s ON m.region_id = s.region_id
LEFT JOIN user_missions um ON m.mission_id = um.mission_id AND um.user_id = 1 -- 특정 사용자 ID (여기서는 1로 가정)
LEFT JOIN user_points up ON um.point_id = up.point_id
WHERE m.region_id = 1 -- 현재 선택된 지역에 해당하는 미션 (예시: region_id = 1)
  AND (um.status IS NULL OR um.status = '진행 중') -- 미션이 진행 중이거나 아직 도전하지 않은 것만 조회
ORDER BY m.created_at DESC -- 최신 미션 우선 정렬
LIMIT 15 OFFSET (n - 1) * 15; -


--Cursor based 페이징

-- 커서 페이징을 활용한 미션 목록 조회 -
SET @last_created_at = '2024-09-20 12:00:00'; -- 이전 페이지의 마지막 레코드의 created_at (예시로 날짜를 사용)
SET @last_mission_id = 10; -- 동일한 created_at일 때의 마지막 mission_id (예시로 10을 사용)

-- 다음 페이지를 가져오는 쿼리
SELECT 
    m.mission_id,
    s.store_name,
    m.description,
    m.created_at,
    m.mission_status,
    IFNULL(up.points, 0) AS points,
    DATEDIFF(NOW(), m.created_at) AS days_left
FROM missions m
JOIN stores s ON m.region_id = s.region_id
LEFT JOIN user_missions um ON m.mission_id = um.mission_id AND um.user_id = 1
LEFT JOIN user_points up ON um.point_id = up.point_id
WHERE m.region_id = 1 -- 선택된 지역
  AND (
      m.created_at < @last_created_at -- 이전 페이지의 마지막 created_at보다 더 이전의 레코드를 가져옴
      OR (m.created_at = @last_created_at AND m.mission_id > @last_mission_id) -- 동일한 created_at일 경우 mission_id로 정렬
  )
ORDER BY m.created_at DESC, m.mission_id ASC -- 최신 순으로 정렬, 동일한 created_at일 때는 mission_id로 정렬
LIMIT 15; -- 페이지당 15개씩 가져오기


--마이 페이지 화면 쿼리

SELECT 
    u.username AS nickname, -- 닉네임
    u.email, -- 이메일
    COALESCE(u.phone_number, '미인증') AS phone_status, -- 휴대폰 인증 여부 (NULL일 경우 '미인증' 표시)
    COALESCE(up.points, 0) AS total_points, -- 총 포인트 (포인트가 없을 경우 0으로 표시)
    COUNT(r.review_id) AS review_count -- 작성한 리뷰 수
FROM users u
LEFT JOIN user_points up ON u.user_id = up.user_id
LEFT JOIN reviews r ON u.user_id = r.user_id
WHERE u.user_id = 1 -- 특정 사용자 ID (여기서는 1로 가정)
GROUP BY u.user_id, u.username, u.email, u.phone_number, up.points
LIMIT 0, 1000;