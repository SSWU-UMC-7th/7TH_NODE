export const bodyToReview = (body) => {
    return {
        storeId: body.storeId,
        content: body.content || "",
    };
};

export const responseFromReview = (user_store_review) => {
    return {
        id: user_store_review.id,
        storeId: user_store_review.store_id,
        userId: user_store_review.user_id,
        content: user_store_review.content,
    };
};