import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp, getUserReviewsService } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  const user = await userSignUp(bodyToUser(req.body));

  res.status(StatusCodes.OK).success(user);
};

export const handleUserReviews = async (req, res, next) => {
  console.log("리뷰 목록 조회 요청을 받았습니다!");
  console.log("params:", req.params); // userId가 잘 들어오는지 확인하기 위한 테스트용

  try {
    const userId = parseInt(req.params.userId, 10);
    const reviews = await getUserReviewsService(userId);

    res.status(StatusCodes.OK).json({ success: true, data: reviews });
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to fetch user reviews" });
    next(error);
  }
};
