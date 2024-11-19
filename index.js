import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";
import {
  handleUserSignUp,
  handleUserReviews,
} from "./controllers/user.controller.js";
import { handleUserMissions } from "./controllers/mission.controller.js";
import {
  handleMissionChallengeSignUp,
  handleOngoingMissions,
} from "./controllers/mission_challenge.controller.js";
import { handleReviewSignUp } from "./controllers/review.controller.js";
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

app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(
    {},
    {
      swaggerOptions: {
        url: "/openapi.json",
      },
    }
  )
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
app.get("/api/v1/stores/:storeId/reviews", handleUserReviews);

// 미션 목록 API
app.get("/api/v1/users/:userId/missions", handleUserMissions);

// 진행 중인 미션 목록 API
app.get("/api/v1/users/:userId/ongoing-missions", handleOngoingMissions);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
