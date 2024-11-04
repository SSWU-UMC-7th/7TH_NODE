import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { listUserReviews } from '../repositories/user.repository.js';
import { responseFromReviews } from '../dtos/review.dto.js';

export const handleUserSignUp = async (req, res) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  try {
    const userData = bodyToUser(req.body); // 요청 바디를 사용자 데이터 형식으로 변환
    const joinUserId = await userSignUp(userData); // 사용자 가입 처리

    if (!joinUserId) {
      return res.status(StatusCodes.CONFLICT).json({ error: "이미 존재하는 이메일입니다." });
    }

    // 사용자 리뷰 목록 조회
    const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : 0; // cursor 기본값 설정
    const reviews = await listUserReviews(joinUserId, cursor); // 사용자 리뷰 목록 조회
    const response = responseFromReviews(reviews); // 리뷰 데이터 변환

    res.status(StatusCodes.OK).json({ result: userData, reviews: response }); // 사용자 데이터와 리뷰 반환
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '회원가입 처리에 실패했습니다.' });
  }
};
