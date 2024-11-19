import { addReview, checkStoreExists } from "../repositories/review.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";
import { StoreNotFoundError, ReviewAddError } from "../error.js";

export const reviewSignUp = async (data) => {
    const storeExists = await checkStoreExists(data.storeId);
    if (!storeExists) {
        throw new StoreNotFoundError("리뷰를 추가할 가게가 존재하지 않습니다.", { storeId: data.storeId });
    }

    const reviewId = await addReview(data);
    if (!reviewId) {
        throw new ReviewAddError("리뷰를 추가할 수 없습니다.", data);
    }

    return responseFromReview({ reviewId, ...data });
};
