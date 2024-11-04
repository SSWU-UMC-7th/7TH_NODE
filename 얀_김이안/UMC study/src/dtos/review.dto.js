export const bodyToReview = (body) => {
    return {
        storeId: body.storeId,
        content: body.content || "",
    };
};

export const responseFromReviews = (user_store_review) => {
    return {
        id: user_store_review.id,
        storeId: user_store_review.store_id,
        userId: user_store_review.user_id,
        content: user_store_review.content,
    };
};

// 여러 리뷰에 대한 응답 형식으로 변환
export const responseFromReviewList = (review) => {
    return {
      data: review.map((review) => responseFromReviews(review)),
      pagination: {
        cursor: review.length ? review[review.length - 1].id : null,
      },
    };
  };