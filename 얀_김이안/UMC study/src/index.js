import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleReviewSignUp } from "./controllers/review.controller.js";
import { handleChallengeSignUp } from "./controllers/challenge.controller.js";
import { handleListStoreMissions } from "./controllers/mission.controller.js";
import { challengeSignUp } from "./services/challenge.service.js"; // 특정 사용자의 진행 중인 미션 목록 컨트롤러 추가
import { handleUpdateMissionCompletion } from './controllers/mission.controller.js'; // 미션 완료 처리 컨트롤러 추가

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors()); // CORS 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // JSON 요청 본문 파싱
app.use(express.urlencoded({ extended: false })); // URL 인코딩된 본문 파싱

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/reviews", handleReviewSignUp); // 리뷰 등록 API
app.post("/api/v1/missions/challenge", handleChallengeSignUp); // 미션 도전 API

// 특정 가게의 미션 목록 조회 API
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);

// 특정 사용자의 진행 중인 미션 목록 조회 API
app.get("/api/v1/users/:userId/missions/in-progress", challengeSignUp);

// 특정 사용자의 진행 중인 미션 완료로 업데이트 API 추가
app.put('/api/v1/users/:userId/missions/:missionId/complete', handleUpdateMissionCompletion);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
