import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { reviewSignUp } from "../services/review.service.js";

export const handleReviewSignUp = async (req, res, next) => {
  try {
    const review = await reviewSignUp(bodyToReview(req.body));
    res.status(StatusCodes.CREATED).success(review);
  } catch (error) {
    next(error);
  }
};
