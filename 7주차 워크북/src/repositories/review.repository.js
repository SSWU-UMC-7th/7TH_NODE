import { prisma } from "../db.config.js";

export const addReview = async (data) => {
  const result = await prisma.reviews.create({
    data: {
      user_id: data.userId,
      store_id: data.storeId,
      rating: data.rating,
      review_text: data.reviewText,
    },
  });
  return result.id;
};

export const checkStoreExists = async (storeId) => {
  const store = await prisma.stores.findUnique({
    where: { id: storeId },
  });
  return !!store;
};


//ORM 형식으로 변경