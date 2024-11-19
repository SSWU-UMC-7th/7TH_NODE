import dotenv from "dotenv";
import { Strategy as NaverStrategy } from 'passport-naver';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { prisma } from "./db.config.js";
import passport from "passport";


dotenv.config();

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
  console.log("Google profile:", profile);

  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  try {
    const user = await prisma.users.findFirst({ where: { email } });
    console.log("User found:", user);

    if (user !== null) {
      return { id: user.id, email: user.email, name: user.user_name };
    }

    const created = await prisma.users.create({
      data: {
        email,
        user_name: profile.displayName,
        gender: "추후 수정",
        birth: new Date(1970, 0, 1),
        address: "추후 수정",
        detailAddress: "추후 수정",
        phoneNumber: "추후 수정",
        password: null, // 명시적으로 null 설정
      },
    });
    console.log("User created:", created);
    return { id: created.id, email: created.email, name: created.user_name };
  } catch (error) {
    console.error("Error in googleVerify:", error);
    throw error;
  }
};


export const naverStrategy = new NaverStrategy(
  {
    clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
    clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
    callbackURL: process.env.PASSPORT_NAVER_REDIRECT_URI,
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log("Naver profile:", profile);

    const email = profile.emails?.[0]?.value || null;
    if (!email) {
      return done(new Error(`Email not found in Naver profile: ${JSON.stringify(profile)}`));
    }

    try {
      // 기존 사용자 검색
      const user = await prisma.users.findFirst({ where: { email } });
      console.log("User found:", user);

      if (user) {
        return done(null, { id: user.id, email: user.email, name: user.user_name });
      }

      // 새로운 사용자 생성
      const created = await prisma.users.create({
        data: {
          email,
          user_name: profile.displayName || "네이버 사용자",
          gender: "추후 수정",
          birth: new Date(1970, 0, 1),
          address: "추후 수정",
          detailAddress: "추후 수정",
          phoneNumber: "추후 수정",
          password: null,
        },
      });
      console.log("User created:", created);
      return done(null, { id: created.id, email: created.email, name: created.user_name });
    } catch (error) {
      console.error("Error in naverVerify:", error);
      return done(error);
    }
  }
);

// Passport Configuration
passport.use(naverStrategy);

export default passport;