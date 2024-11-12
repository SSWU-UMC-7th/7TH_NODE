export const bodyToReview = (body) => {
  return {
    userEmail: body.userEmail,
    storeId: body.storeId,
    rating: body.rating,
    comment: body.comment || "",
  };
};

export const responseFromReview = (review) => {
  return {
    id: review.id,
    userEmail: review.user_email,
    storeId: review.store_id,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.created_at,
    updatedAt: review.updated_at,
  };
};

export const reviewFromUser = (review) => {
  return {
    id: review.id,
    content: review.content,
    rating: review.rating,
    createdAt: review.createdAt,
    productName: review.product.name,
  };
};
