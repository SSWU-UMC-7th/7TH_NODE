// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { handleStoreSignUp,handleListStoreReviews} from "./controller/store.controller.js";
import { handleReviewSignUp } from "./controller/review.controller.js";
import { handleMissionSignUp,handleListStoreMissions,handleListUserInProgressMissions,handleCompleteUserMission   } from "./controller/mission.controller.js";
import { handleChallengeSignUp } from "./controller/challenge.controller.js";
import { handleListUserReviews, handleUserLogin,handleUserSignUp } from './controller/user.controller.js';

//swagger
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

// passport
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";
import naverAuthRouter from "./naverAuth.js";


dotenv.config();

passport.use(googleStrategy);
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // cors 방식 허용
app.use(express.static("public")); // 정적 파일 접근
app.use(express.json()); // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석

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
  res.send("Hello World!");
});


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


// 가게 추가 API
app.post("/api/stores", handleStoreSignUp);

// 가게 리뷰 추가 API
app.post("/api/reviews", handleReviewSignUp);

// 가게 미션 추가 API
app.post("/api/missions", handleMissionSignUp);

// 가게의 미션 도전하기 API
app.post("/api/challenges", handleChallengeSignUp);

// 리뷰 목록 확인 
app.get("/api/stores/:storeId/reviews", handleListStoreReviews)

// 내가 작성한 리뷰 목록 확인 
app.get('/api/users/:userId/reviews', handleListUserReviews);

// 특정 가게의 미션 목록 조회 API
app.get('/api/stores/:storeId/missions', handleListStoreMissions);

// 특정 사용자의 진행 중인 미션 목록 조회 API
app.get('/api/users/:userId/missions/in-progress', handleListUserInProgressMissions);


// 특정 사용자의 진행 중인 미션 완료로 업데이트 API
app.put('/api/users/:userId/missions/:missionId/complete', handleCompleteUserMission);

//유저 로그인 API 
app.post("/api/users/login", handleUserLogin);
// 유저 회원가입 API
app.post("/api/users/signup", handleUserSignUp);

//네이버 로그인 확인 
app.use(naverAuthRouter);


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


app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
