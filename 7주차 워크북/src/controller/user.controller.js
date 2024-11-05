import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp, listUserReviews } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  try {
    const user = await userSignUp(bodyToUser(req.body));
    res.status(StatusCodes.OK).success(user);
  } catch (error) {
    next(error);
  }
};

export const handleListUserReviews = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : 0;
    const reviews = await listUserReviews(userId, cursor);
    res.status(StatusCodes.OK).success(reviews);
  } catch (error) {
    next(error);
  }
};
