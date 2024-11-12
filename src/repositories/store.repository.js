import { prisma } from "../db.config.js";

// Store 데이터 삽입
export const addStore = async (data) => {
  try {
    const store = await prisma.store.create({
      data: {
        name: data.name,
        address: data.address,
        phone_number: data.phoneNumber,
      },
    });
    return store.id;
  } catch (err) {
    throw new Error(`오류가 발생했습니다: ${err}`);
  }
};

// Store 정보 얻기
export const getStoreById = async (storeId) => {
  try {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });
    return store; // Store가 없으면 null 반환
  } catch (err) {
    throw new Error(`오류가 발생했습니다: ${err}`);
  }
};

// Store가 존재하는지 확인
export const storeExists = async (storeId) => {
  try {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });
    return store !== null; // Store가 존재하면 true 반환
  } catch (err) {
    throw new Error(`오류가 발생했습니다: ${err}`);
  }
};
