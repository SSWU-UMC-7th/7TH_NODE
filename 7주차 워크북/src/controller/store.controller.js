// src/controller/store.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { storeSignUp } from "../services/store.service.js";
import { listStoreReviews } from "../services/store.service.js";

export const handleStoreSignUp = async (req, res, next) => {
    try {
        const store = await storeSignUp(bodyToStore(req.body));
        res.status(StatusCodes.CREATED).json({ result: store });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

export const handleListStoreReviews = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : 0;
    const reviews = await listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).json(reviews); // 데이터를 JSON으로 반환
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '리뷰 조회에 실패했습니다.' });
  }
};