// src/dtos/challenge.dto.js
export const bodyToChallenge = (body) => {
    return {
        userId: body.userId,
        missionId: body.missionId,
        storeId: body.storeId,
        status: "IN_PROGRESS"
    };
};

export const responseFromChallenge = (challenge) => {
    return {
        userMissionId: challenge.userMissionId,
        userId: challenge.userId,
        missionId: challenge.missionId,
        storeId: challenge.storeId,
        status: challenge.status,
        completedAt: challenge.completedAt,
    };
};