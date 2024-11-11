import { prisma } from "../db.config.js";

// Store 데이터 삽입하기
export const addStore = async (data) => {
    try {
        const result = await prisma.store.create({
            data: {
                name: data.name,
                address: data.address,
                phone_number: data.phone_number,
            },
        });
        return result.id;
    } catch (err) {
        throw new Error(`오류가 발생했습니다: ${err}`);
    }
};

// Store 정보 얻기
export const getStoreById = async (storeId) => {
    try {
        const result = await prisma.store.findUnique({
            where: {
                id: storeId,
            },
        });
        return result;
    } catch (err) {
        throw new Error(`오류가 발생했습니다: ${err}`);
    }
};

// Store 존재 여부 확인
export const storeExists = async (storeId) => {
    try {
        const result = await prisma.store.findUnique({
            where: {
                id: storeId,
            },
        });
        return result !== null;
    } catch (err) {
        throw new Error(`오류가 발생했습니다: ${err}`);
    }
};
