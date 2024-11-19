import express from "express";
import passport from "passport";

const router = express.Router();

// 카카오 로그인 시작
router.get("/auth/kakao", passport.authenticate("kakao"));

// 카카오 로그인 콜백
router.get(
  "/auth/kakao/callback",
  passport.authenticate("kakao", { failureRedirect: "/login" }),
  (req, res) => {
    // 로그인 성공 시 리다이렉션
    res.redirect("/");
  }
);

export default router;
