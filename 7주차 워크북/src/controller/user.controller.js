import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";
import { listUserReviews } from '../services/user.service.js';

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ result: user });
};


export const handleListUserReviews = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10); // URL에서 userId 가져오기
    const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : 0; // cursor 기본값 설정
    const reviews = await listUserReviews(userId, cursor);
    res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '리뷰 조회에 실패했습니다.' });
  }
};