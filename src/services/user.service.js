import { responseFromUser } from "../dtos/user.dto.js";
import { reviewFromUser } from "../dtos/review.dto.js";
import { DuplicateUserEmailError } from "../errors.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
  getUserReviews,
} from "../repositories/user.repository.js";

export const userSignUp = async (db, data) => {
  const joinUserId = await addUser(db, {
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber, // password도 있었음
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data);
  }

  for (const preference of data.preferences) {
    await setPreference(db, data.email, preference); // joinUserId 대신 data.email 썼었음
  }

  const user = await getUser(db, data.email);
  const preferences = await getUserPreferencesByUserId(db, joinUserId);
  console.log(data.email);
  return responseFromUser({ user, preferences });
};

export const getUserReviewsService = async (userId) => {
  const reviews = await getUserReviews(userId);
  return reviews.map((review) => new reviewFromUser(review));
};
