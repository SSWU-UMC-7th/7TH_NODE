import {
  addReview,
  getReviewById,
  getAllStoreReviews,
} from "../repositories/review.repository.js";
import { storeExists } from "../repositories/store.repository.js";
import { responseFromReview } from "../dtos/review.dto.js";
import { StoreNotFoundError, ReviewCreationError } from "../errors.js";

export const reviewSignUp = async (data) => {
  // 리뷰를 추가하려는 가게가 존재하는지 확인
  const isStoreValid = await storeExists(data.storeId);
  if (!isStoreValid) {
    throw new StoreNotFoundError("리뷰하려는 가게가 존재하지 않습니다.", data);
  }

  // 가게가 존재할 경우에만 리뷰 추가
  const reviewId = await addReview({
    userEmail: data.user_email,
    storeId: data.storeId,
    rating: data.rating,
    comment: data.comment,
  });

  if (!reviewId) {
    throw new ReviewCreationError("리뷰 등록에 실패했습니다.", {
      storeId,
      data,
      error: error.message, // 실제 에러 메시지 포함
    });
  }

  const review = await getReviewById(reviewId);
  return responseFromReview({ review });
};

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};
