import express from "express";
import passport from "passport";

const router = express.Router();

router.get("/auth/naver", passport.authenticate("naver"));

router.get(
  "/auth/naver/callback",
  passport.authenticate("naver", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);
export default router;
