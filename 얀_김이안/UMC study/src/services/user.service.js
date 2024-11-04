import { getUserReview } from '../repositories/user.repository.js';
import { responseFromReviews } from '../dtos/review.dto.js';

// 사용자 리뷰 목록 조회
export const listUserReview = async (userId, cursor) => {
  const review = await getUserReview(userId, cursor);
  return responseFromReview(review); // 변환된 리뷰 데이터 반환
};

// 사용자 가입 처리
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

  for (const preference of data.preference) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preference = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preference });
};
