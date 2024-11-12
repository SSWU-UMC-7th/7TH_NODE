import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "./dtos/user.dto.js";
import { userSignUp } from "./services/user.service.js";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleReviewSignUp } from "./controllers/review.controller.js";
import { handleChallengeSignUp } from "./controllers/challenge.controller.js";
import { handleListStoreMissions } from "./controllers/mission.controller.js";
import { challengeSignUp } from "./services/challenge.service.js";
import { handleUpdateMissionCompletion } from "./controllers/mission.controller.js";
import { DuplicateUserEmailError } from './errors.js';

import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import { handleListStoreReviews } from "./controllers/store.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // CORS 허용

// 공통 응답 헬퍼 함수 등록
app.use((req, res, next) => {
  res.success = (success) => {
    return res.json({ resultType: "SUCCESS", error: null, success });
  };

  res.error = ({ errorCode = "unknown", reason = null, data = null }) => {
    return res.json({
      resultType: "FAIL",
      error: { errorCode, reason, data },
      success: null,
    });
  };

  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 다른 API 핸들러들
app.post("/api/v1/users/signup", handleUserSignUp);
app.post("/api/v1/reviews", handleReviewSignUp); // 리뷰 등록 API
app.post("/api/v1/missions/challenge", handleChallengeSignUp); // 미션 도전 API

// 특정 가게의 미션 목록 조회 API
app.get("/api/v1/stores/:storeId/missions", handleListStoreMissions);

// 상점 리뷰 목록 조회 API
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

// 특정 사용자의 진행 중인 미션 목록 조회 API
app.get("/api/v1/users/:userId/missions/in-progress", challengeSignUp);

// 특정 사용자의 진행 중인 미션 완료로 업데이트 API 추가
app.put('/api/v1/users/:userId/missions/:missionId/complete', handleUpdateMissionCompletion);

// 서버 시작
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/**
 * 전역 오류를 처리하기 위한 미들웨어
 */
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "unknown",
    reason: err.reason || err.message || null,
    data: err.data || null,
  });
});

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력은 사용하지 않습니다.
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});