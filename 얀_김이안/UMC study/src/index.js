import cors from "cors";  // cors 방식 허용
import dotenv from "dotenv";
import express from "express";
import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleReviewSignUp } from "./controllers/review.controller.js";
import { handleChallengeSignUp } from "./controllers/challenge.controller.js";
import { handleListStoreMissions, handleUpdateMissionCompletion } from "./controllers/mission.controller.js";
import { handleListStoreReviews } from "./controllers/store.controller.js";
import { challengeSignUp } from "./services/challenge.service.js";

// swagger
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

// passport
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";

// passport 중에서 kakao
import kakaoAuthRouter from "./kakaoAuth.js";

dotenv.config();

passport.use(googleStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // CORS 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

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

// 다른 API 핸들러들
app.post("/api/v1/users/signup", handleUserSignUp);

// 리뷰 등록 API
app.post("/api/v1/reviews", handleReviewSignUp);

// 미션 도전 API
app.post("/api/v1/missions/challenge", handleChallengeSignUp);

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

// Swagger 처리하기 위한 코드
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
  const outputFile = "/dev/null"; // 파일 출력 사용 X
  const routes = ["./src/index.js"];
  const doc = {
    info: {
      title: "UMC 7th",
      description: "UMC 7th Node.js 테스트 프로젝트이다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

// 9주차 실습 추가 내용
// app.use(
//   session({
//     cookie: {
//       maxAge: 7 * 24 * 60 * 60 * 1000, // ms
//     },
//     resave: false,
//     saveUninitialized: false,
//     secret: process.env.EXPRESS_SESSION_SECRET
//   })
// );

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  // #swagger.ignore = true
  console.log(req.user);
  res.send("Hello World!");
});

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

app.use(passport.session());

// 로그인 할 수 있는 경로 작성
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

// 카카오 인증 라우터 연결
app.use(kakaoAuthRouter);