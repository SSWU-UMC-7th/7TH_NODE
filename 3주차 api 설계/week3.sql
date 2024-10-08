### API 명세서

---

### 1. **회원 가입 (회원 가입하기 기능)**

- **설명:** 새로운 사용자를 등록
- **Endpoint:** `POST /api/users/register`
- **Request Body:**
    
    ```json
    
    {
      "user_name": "string",
      "password": "string",
      "email": "string"
    }
    
    ```
    
- **Response:**
    - 201 Created: 사용자 등록 성공
    - 400 Bad Request: 잘못된 입력 값

---

### 2. **홈 화면 - 내가 받은 미션 목록 조회 (진행중, 완료 포함)**

- **설명:** 사용자가 받은 미션들을 조회
- **Endpoint:** `GET /api/missions`
- **Query String:**
    - `status`: `in-progress` 또는 `completed` (필터링)
- **Request Header:**
    - Authorization: `Bearer <token>`
- **Response:**
    
    ```json
    
    [
      {
        "mission_id": 1,
        "description": "미션 설명",
        "mission_status": "수행 중",
        "region": "Seoul",
        "created_at": "2024-10-08T10:15:30"
      },
      {
        "mission_id": 2,
        "description": "미션 설명",
        "mission_status": "완료",
        "region": "Busan",
        "created_at": "2024-10-05T09:00:00"
      }
    ]
    
    ```
    

---

### 3. **마이 페이지 - 리뷰 작성 (리뷰 작성 기능)**

- **설명:** 사용자가 가게에 대한 리뷰를 작성
- **Endpoint:** `POST /api/reviews`
- **Request Body:**
    
    ```json
    
    {
      "store_id": 1,
      "rating": 5,
      "review_text": "리뷰 내용"
    }
    
    ```
    
- **Request Header:**
    - Authorization: `Bearer <token>`
    - Content-Type: `application/json`
- **Response:**
    - 201 Created: 리뷰 작성 성공
    - 400 Bad Request: 잘못된 입력 값

---

### 4. **미션 목록 조회 (진행 중인 미션과 완료된 미션)**

- **설명:** 사용자가 진행 중인 미션 또는 완료된 미션 목록을 조회
- **Endpoint:** `GET /api/users/{user_id}/missions`
- **Query String:**
    - `status`: `in-progress` 또는 `completed`
- **Path Variable:**
    - `user_id`: 조회할 사용자의 ID
- **Request Header:**
    - Authorization: `Bearer <token>`
- **Response:**
    
    ```json
    
    [
      {
        "mission_id": 1,
        "description": "미션 설명",
        "status": "진행 중",
        "completed_at": null},
      {
        "mission_id": 2,
        "description": "미션 설명",
        "status": "완료",
        "completed_at": "2024-10-05T12:34:56"
      }
    ]
    
    ```
    

---

### 5. **미션 성공 누르기 (미션 완료 처리)**

- **설명:** 사용자가 미션을 완료로 변경.
- **Endpoint:** `PATCH /api/missions/{mission_id}/complete`
- **Path Variable:**
    - `mission_id`: 완료 처리할 미션의 ID
- **Request Header:**
    - Authorization: `Bearer <token>`
- **Response:**
    - 200 OK: 미션 완료 성공
    - 400 Bad Request: 미션 상태가 이미 완료되었거나 유효하지 않은 경우