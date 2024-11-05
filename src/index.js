import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleMissionChallengeSignUp } from "./controllers/mission_challenge.controller.js";
import { handleReviewSignUp } from "./controllers/review.controller.js";
import { handleListStoreReviews } from "./controllers/store.controller.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// 공통 응답을 사용할 수 있는 헬퍼 함수 등록
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

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// user API
app.post("/api/v1/users/signup", handleUserSignUp);

// 전역 오류를 처리하기 위한 미들웨어
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

// 리뷰 등록 API
app.post("/api/v1/reviews", handleReviewSignUp);

// 미션 도전 API
app.post("/api/v1/missions/challenge", handleMissionChallengeSignUp);

// 리뷰 목록 API
app.get("/api/v1/stores/:storeId/reviews", handleListStoreReviews);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
