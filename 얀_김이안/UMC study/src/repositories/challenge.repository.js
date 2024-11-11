import { prisma } from "../db.config.js";

// Challenge 데이터 삽입
export const addChallenge = async (data) => {
    try {
        const result = await prisma.review.create({
            data: {
                mission_id: data.missionId,
            },
        });
        return result.id;
    } catch (err) {
        throw new Error(`오류가 발생했습니다: ${err}`);
    }
};

// Challenge 정보 얻기
export const getChallengeById = async (challengeId) => {
    try {
        const result = await prisma.challenge.findUnique({
            where: {
                challenge_id: challengeId,
            },
        });
        return result;
    } catch (err) {
        throw new Error(`오류가 발생했습니다: ${err}`);
    }
};

// 동일 미션에 대해 도전 중인지 확인
export const isChallengeExists = async (challengeId) => {
    try {
        const result = await prisma.challenge.findFirst({
            where: {
                challenge_id: challengeId,
                status: 'ongoing',
            },
        });
        return result !== null;
    } catch (err) {
        throw new Error(`오류가 발생했습니다: ${err}`);
    }
};
