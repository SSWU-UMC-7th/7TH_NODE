// src/dtos/review.dto.js

export const bodyToReview = (body) => ({
  userId: body.userId,
  storeId: body.storeId,
  rating: body.rating,
  reviewText: body.reviewText,
});

export const responseFromReview = (review) => ({
  reviewId: review.id,
  userId: review.user?.id,            // Optional chaining 사용
  storeId: review.store?.id,          // Optional chaining 사용
  rating: review.rating,
  reviewText: review.review_text,
  createdAt: review.created_at,
  user: review.user
    ? {
        userName: review.user.user_name,
        email: review.user.email,
        gender: review.user.gender,
        birth: review.user.birth,
        address: review.user.address,
        detailAddress: review.user.detailAddress,
        phoneNumber: review.user.phoneNumber,
      }
    : null,                           // user가 없으면 null
  store: review.store
    ? {
        storeName: review.store.store_name,
      }
    : null,                           // store가 없으면 null
});

// 리뷰 목록을 위한 DTO
export const responseFromReviews = (reviews) => {
  if (!Array.isArray(reviews) || reviews.length === 0) {
    // reviews가 배열이 아니거나 비어있는 경우 기본 형식 반환
    return {
      data: [],
      pagination: { cursor: null },
    };
  }
  
  return {
    data: reviews.map((review) => responseFromReview(review)), // 각 리뷰에 대해 변환 수행
    pagination: {
      cursor: reviews.length ? reviews[reviews.length - 1].id : null, // 마지막 리뷰 ID를 cursor로 설정
    },
  };
};