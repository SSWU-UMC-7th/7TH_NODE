import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from "passport-kakao";
import passport from "passport";
import { prisma } from "./db.config.js";

dotenv.config();

// Google Strategy
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: "추후 수정",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: "추후 수정",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

// Kakao Strategy
export const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.KAKAO_CLIENT_ID,
    clientSecret: process.env.KAKAO_CLIENT_SECRET,
    callbackURL: process.env.KAKAO_REDIRECT_URI,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile._json.kakao_account.email;
      const nickname = profile._json.properties.nickname;

      if (!email) {
        throw new Error("Email is required but not found in Kakao profile");
      }

      // 사용자 검색 또는 생성
      const user = await prisma.user.upsert({
        where: { email },
        update: { name: nickname },
        create: {
          kakaoId: profile.id,
          email,
          name: nickname,
          gender: "추후 수정",
          birth: new Date(1970, 0, 1),
          address: "추후 수정",
          detailAddress: "추후 수정",
          phoneNumber: "추후 수정",
        },
      });

      return done(null, { id: user.id, email: user.email, name: user.name });
    } catch (error) {
      return done(error);
    }
  }
);

// Register Strategies with Passport
passport.use(googleStrategy);
passport.use(kakaoStrategy);