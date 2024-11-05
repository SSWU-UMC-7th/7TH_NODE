import { addReview, getReviewById } from "../repositories/review.repository.js";
import { storeExists } from "../repositories/store.repository.js";
import { responseFromReviews } from "../dtos/review.dto.js";
import { StoreNotExistError, ReivewError } from "../errors.js";

export const reviewSignUp = async (data) => {
    // 리뷰를 추가하려는 가게가 존재하는지 확인
    const isStoreValid = await storeExists(data.storeId);
    if (!isStoreValid) {
        throw new StoreNotExistError("리뷰를 추가할 가게가 존재하지 않습니다.", { storeId: data.storeId });
    }

    // 가게가 존재할 경우 리뷰 추가
    const reviewId = await addReview({
        storeId: data.storeId,
        content: data.content,
    });

    if (!reviewId) {
        throw new ReivewError("리뷰를 추가할 수 없습니다.", data);
    }

    // 추가된 리뷰 데이터를 가져와서 응답 형식에 맞게 반환
    const review = await getReviewById(reviewId);
    return responseFromReview(review);
};
