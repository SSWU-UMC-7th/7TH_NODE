import { getUserReview, addUser, setPreference, getUser, getUserPreferencesByUserId } from '../repositories/user.repository.js'; // 필요한 함수들 임포트
import { responseFromReviews } from '../dtos/review.dto.js';
import { responseFromUser } from '../dtos/user.dto.js';
import { DuplicateUserEmailError } from '../errors.js'; // DuplicateUserEmailError 임포트

// 사용자 리뷰 목록 조회
export const listUserReview = async (userId, cursor) => {
  const review = await getUserReview(userId, cursor);
  return responseFromReviews(review); // 변환된 리뷰 데이터 반환
};

// 사용자 가입 처리
export const userSignUp = async (db, data) => {
  const joinUserId = await addUser(db, {
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: data.birth,
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new DuplicateUserEmailError("이미 존재하는 이메일입니다.", data); // DuplicateUserEmailError를 사용하여 오류 처리
  }

  // preferences가 배열인지 확인 후 반복 처리
  if (Array.isArray(data.preferences)) {
    for (const preference of data.preferences) {
      await setPreference(db, joinUserId, preference);
    }
  }

  const user = await getUser(db, joinUserId);
  const preferences = await getUserPreferencesByUserId(db, joinUserId);

  return responseFromUser({ user, preferences });
};
