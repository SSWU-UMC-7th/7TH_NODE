import { prisma } from "../db.config.js";

export const addReview = async (data) => {
  const result = await prisma.reviews.create({
    data: {
      user: { connect: { id: data.userId } },  // user_id를 직접 넣지 않고 관계로 연결
      store: { connect: { id: data.storeId } }, // store_id를 직접 넣지 않고 관계로 연결
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