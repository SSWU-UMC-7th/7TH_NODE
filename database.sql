-- 예시 대입한 쿼리
SELECT 
    mm.id AS member_mission_id,
    m.reward AS mission_reward,
    m.mission_spec AS mission_description,
    mm.status AS mission_status,
    mm.created_at AS mission_created_at,
    s.name AS store_name,
    s.address AS store_address
FROM 
    member_mission mm
JOIN 
    mission m ON mm.mission_id = m.id
JOIN 
    store s ON m.store_id = s.id
WHERE 
    mm.member_id = 1
ORDER BY 
    mm.created_at DESC //최신순
LIMIT 10 OFFSET 0;

-- 예시 대입한 쿼리
SELECT
    r.id AS review_id,
    m.name AS member_name,
    r.body AS review_body,
    r.score AS review_score,
    r.created_at AS review_created_at,
    s.name AS store_name,
    s.address AS store_address
FROM 
    review r
JOIN 
    member m ON r.member_id = m.id
JOIN 
    store s ON r.store_id = s.id
WHERE 
    r.store_id = 1
ORDER BY 
    r.created_at DESC
LIMIT 5 OFFSET 0;

-- 예시 대입한 쿼리
SELECT
    r.id AS review_id,
    m.name AS member_name,
    r.body AS review_body,
    r.score AS review_score,
    r.created_at AS review_created_at,
    s.name AS store_name,
    s.address AS store_address
FROM 
    review r
JOIN 
    member m ON r.member_id = m.id
JOIN 
    store s ON r.store_id = s.id
WHERE 
    r.store_id = 1
ORDER BY 
    r.created_at DESC
LIMIT 5 OFFSET 0;

SELECT 
    m.nickname,
    m.email,
    CASE 
        WHEN m.social_type IS NULL THEN '미인증'
        ELSE '인증완료'
    END AS phone_status,
    m.point,
    (SELECT COUNT(*) FROM review r WHERE r.member_id = m.id) AS review_count
FROM 
    member m
WHERE 
    m.id = 1; // 사용자의 id를 1로 가정