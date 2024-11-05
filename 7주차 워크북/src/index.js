// src/index.js
import express from "express";
import cors from "cors";
import { handleStoreSignUp,handleListStoreReviews} from "./controller/store.controller.js";
import { handleReviewSignUp } from "./controller/review.controller.js";
import { handleMissionSignUp,handleListStoreMissions,handleListUserInProgressMissions,handleCompleteUserMission   } from "./controller/mission.controller.js";
import { handleChallengeSignUp } from "./controller/challenge.controller.js";
import { handleListUserReviews } from './controller/user.controller.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
