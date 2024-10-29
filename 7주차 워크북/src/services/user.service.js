import { responseFromUser } from "../dtos/user.dto.js";
import { getUserReviews } from '../repositories/user.repository.js';
import { responseFromReviews } from '../dtos/review.dto.js';

import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

export const listUserReviews = async (userId, cursor) => {
  const reviews = await getUserReviews(userId, cursor);
  return responseFromReviews(reviews); // 변환된 리뷰 데이터 반환
};