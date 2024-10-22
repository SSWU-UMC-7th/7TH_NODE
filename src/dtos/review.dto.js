// src/dtos/review.dto.js
export const bodyToReview = (body) => {
    return {
        userId: body.userId,
        storeId: body.storeId,
        rating: body.rating,
        reviewText: body.reviewText,
    };
};

export const responseFromReview = (review) => {
    return {
        reviewId: review.reviewId,
        userId: review.userId,
        storeId: review.storeId,
        rating: review.rating,
        reviewText: review.reviewText,
    };
};
