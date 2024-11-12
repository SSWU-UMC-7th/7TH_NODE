import { prisma } from "../db.config.js";

// Add Review using Prisma
export const addReview = async (data) => {
  try {
    const review = await prisma.review.create({
      data: {
        userEmail: data.userEmail,
        storeId: data.storeId,
        rating: data.rating,
        comment: data.comment,
      },
    });
    return review.id;
  } catch (err) {
    throw new Error(`오류가 발생했습니다: ${err.message}`);
  }
};

// Get Review by ID using Prisma
export const getReviewById = async (reviewId) => {
  try {
    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });
    return review;
  } catch (err) {
    throw new Error(`오류가 발생했습니다: ${err.message}`);
  }
};

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: { id: true, content: true, store: true, user: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};
