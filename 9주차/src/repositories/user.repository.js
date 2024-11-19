import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.users.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await prisma.users.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.users.findFirstOrThrow({ where: { id: userId } });
  return user;
};

export const getUserByEmail = async (email) => {
  return await prisma.users.findUnique({
    where: { email },
  });
};//유저 이메일로 사용자 검색


// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  await prisma.user_favor_category.create({
    data: {
      userId: userId,
      foodCategoryId: foodCategoryId,
    },
  });
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.user_favor_category.findMany({
    select: {
      id: true,
      userId: true,
      foodCategoryId: true,
      foodCategory: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: { userId: userId },
    orderBy: { foodCategoryId: "asc" },
  });

  return preferences;
};

//유저 리뷰 작성 기록 확인 
export const getUserReviews = async (userId, cursor = 0) => {
  const reviews = await prisma.reviews.findMany({
    select: {
      id: true,
      review_text: true,
      rating: true,
      created_at: true,
      store: {
        select: { id: true, store_name: true },
      },
    },
    where: { userId: userId }, // cursor 조건 제거
    orderBy: { id: "asc" },
    take: 5,
  });
  console.log("User Reviews found:", reviews); // 쿼리 결과 로그
  return reviews;
};

//리뷰 확인-커서
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