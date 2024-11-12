import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await prisma.user.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.user.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.userFavorCategory.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.userFavorCategory.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: true,
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};

// 사용자 리뷰 가져오기
export const getUserReview = async (userId, cursor = 0) => {
  const review = await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true, // 리뷰 내용
      store: {
        select: { id: true, name: true }, // 상점 정보
      },
    },
    where: { userId: userId, id: { gt: cursor } }, // userId 조건으로 조회
    orderBy: { id: "asc" },
    take: 5,
  });
  
  console.log("User Reviews found:", review); // 쿼리 결과 로그
  return review;
};

export const getAllStoreReviews = async (storeId, cursor) => {
  const reviews = await prisma.reviews.findMany({
    select: {
      id: true,
      review_text: true, // 리뷰 내용
      rating: true,      // 리뷰 평점
      created_at: true,  // 작성일
      store: {
        select: { id: true, store_name: true },
      },
      user: {
        select: {
          id: true,
          user_name: true,
          email: true,
          gender: true,
          birth: true,
          address: true,
          detailAddress: true,
          phoneNumber: true,
        },
      },
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });
  console.log("Reviews found:", reviews); // 쿼리 결과 로그

  return reviews;
};

export const listUserReviews = async (storeId, cursor) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: { id: true, content: true, store: true, user: true },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};