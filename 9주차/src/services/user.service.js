import { responseFromUser } from "../dtos/user.dto.js";
import { getUserReviews, addUser, getUser, getUserPreferencesByUserId, setPreference,getUserByEmail } from "../repositories/user.repository.js";
import { responseFromReviews } from '../dtos/review.dto.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { DuplicateUserEmailError } from '../error.js';

export const userSignUp = async (data) => {
  // 이메일 중복 확인
  const existingUser = await getUserByEmail(data.email);
  if (existingUser) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", { email: data.email });
  }

  // 비밀번호 암호화
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // 사용자 추가
  const newUser = await addUser({
    email: data.email,
    user_name: data.name,
    password: hashedPassword,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  return responseFromUser(newUser);
};


export const userLogin = async (data) => {
  // 이메일로 사용자 정보 검색
  const user = await getUserByEmail(data.email);
  if (!user) {
    throw new Error("사용자를 찾을 수 없습니다.");
  }

  // 비밀번호 확인
  const passwordMatch = await bcrypt.compare(data.password, user.password);
  if (!passwordMatch) {
    throw new Error("잘못된 비밀번호입니다.");
  }

  // JWT 생성
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return { token, user };
};


export const listUserReviews = async (userId, cursor) => {
  const reviews = await getUserReviews(userId, cursor);
  return responseFromReviews(reviews);
};
