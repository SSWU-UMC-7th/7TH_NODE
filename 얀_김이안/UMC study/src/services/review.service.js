import {addReview, getReviewById} from "../repositories/review.repository.js";
import { storeExists } from "../repositories/store.repository.js";
import { responseFromReviews } from "../dtos/review.dto.js";

export const reviewSignUp = async (data) => {
    // 리뷰를 추가하려는 가게 존재 여부 확인
    const isStoreValid = await storeExists(data.storeId);
    if (!isStoreValid) {
        throw new Error("리뷰하려는 가게가 존재하지 않습니다.");
    }

    // 가게가 존재할 경우에만 리뷰 추가
    const reviewId = await addReview({
        storeId: data.storeId,
        content: data.content,
    });

    if (!reviewId) {
        throw new Error("Review 등록에 실패했습니다.");
    }

    const review = await getReviewById(reviewId);
    return responseFromReview({review});
};