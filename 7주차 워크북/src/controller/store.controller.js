import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { storeSignUp, listStoreReviews } from "../services/store.service.js";

export const handleStoreSignUp = async (req, res, next) => {
  try {
    const store = await storeSignUp(bodyToStore(req.body));
    res.status(StatusCodes.CREATED).success(store);
  } catch (error) {
    next(error); // 전역 오류 핸들러로 오류 전달
  }
};

export const handleListStoreReviews = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : 0;
    const reviews = await listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).success(reviews);
  } catch (error) {
    next(error);
  }
};
