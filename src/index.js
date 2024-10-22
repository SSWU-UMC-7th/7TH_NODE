// src/index.js
import express from "express";
import cors from "cors";
import { handleStoreSignUp } from "./controller/store.controller.js";
import { handleReviewSignUp } from "./controller/review.controller.js";
import { handleMissionSignUp } from "./controller/mission.controller.js";
import { handleChallengeSignUp } from "./controller/challenge.controller.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// 가게 추가 API
app.post("/api/stores", handleStoreSignUp);

// 가게 리뷰 추가 API
app.post("/api/reviews", handleReviewSignUp);

// 가게 미션 추가 API
app.post("/api/missions", handleMissionSignUp);

// 가게의 미션 도전하기 API
app.post("/api/challenges", handleChallengeSignUp);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
