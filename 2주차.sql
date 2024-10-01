SELECT mission_id, reward_points, mission_name, mission_status
FROM missions
WHERE user_id = {사용자 ID}
ORDER BY mission_status = '진행중' DESC, updated_at DESC
LIMIT 10 OFFSET (n - 1) * 10;



INSERT INTO review (
    member_id, 
    store_id, 
    body, 
    score, 
    created_at
) 
VALUES (
    1,                                -- 작성자 ID
    1,                                -- 가게 ID
    '음 너무 맛있어요 포인트도 얻고 맛있는 맛집도 알게 된 것 같아 너무나도 행복한 식사였습니다. 다음에 또 올게요!!', -- 리뷰 내용
    5,                                -- 별점 (1~5점)
    NOW()                             -- 작성 시간 (현재 시간)
);


SELECT 
    mm.id AS mission_id,
    m.reward AS mission_reward,
    m.mission_spec AS mission_description,
    s.name AS store_name,
    s.address AS store_address,
    mm.status AS mission_status,
    mm.created_at AS mission_created_at
FROM 
    member_mission mm
JOIN 
    mission m ON mm.mission_id = m.id
JOIN 
    store s ON m.store_id = s.id
WHERE 
    s.region = '안암동'   -- 사용자가 선택한 지역
    AND mm.status = '도전 가능'   -- 도전 가능한 미션만
ORDER BY 
    mm.created_at DESC   -- 최신순으로 정렬
LIMIT 10 OFFSET (n - 1) * 10;  -- 페이징 적용


SELECT
    m.nickname AS user_nickname,
    m.email AS user_email,
    CASE 
        WHEN m.phone_verified = 1 THEN '인증 완료'
        ELSE '미인증'
    END AS phone_verification_status,
    m.points AS user_points,
    (SELECT COUNT(*) FROM review r WHERE r.member_id = m.id) AS written_reviews_count
FROM
    member m
WHERE
    m.id = 1;  -- 현재 로그인한 사용자 ID