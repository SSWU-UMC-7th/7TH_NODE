import { prisma } from "../db.config.js";

// Review 데이터 삽입
export const addReview = async (data) => {
    try {
        const result = await prisma.review.create({
            data: {
                store_id: data.storeId,
                content: data.content,
            },
        });
        return result.id;
    } catch (err) {
        throw new Error(`오류가 발생했습니다: ${err}`);
    }
};

// Review 정보 얻기
export const getReviewById = async (reviewId) => {
    try {
        const result = await prisma.review.findUnique({
            where: {
                id: reviewId,
            },
        });
        return result;
    } catch (err) {
        throw new Error(`오류가 발생했습니다: ${err}`);
    }
};
