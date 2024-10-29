// src/services/review.service.js
import { addReview, checkStoreExists } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";

export const reviewSignUp = async (data) => {
    const storeExists = await checkStoreExists(data.storeId);
    if (!storeExists) {
        throw new Error("리뷰를 추가할 가게가 존재하지 않습니다.");
    }

    const reviewId = await addReview(data);
    if (!reviewId) {
        throw new Error("리뷰를 추가할 수 없습니다.");
    }

    return responseFromReview({ reviewId, ...data });
};