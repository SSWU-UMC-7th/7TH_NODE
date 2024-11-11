import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  try {
    const userData = bodyToUser(req.body); // 요청 바디를 사용자 데이터 형식으로 변환
    const user = await userSignUp(userData); // 사용자 가입 처리

    if (!user) {
      return res.error({
        errorCode: "duplicate_email",
        reason: "이미 존재하는 이메일입니다."
      });
    }

    res.success(user); // 성공 응답
  } catch (error) {
    console.error(error);
    res.error({
      errorCode: "internal_error",
      reason: '회원가입 처리에 실패했습니다.'
    });
  }
};
