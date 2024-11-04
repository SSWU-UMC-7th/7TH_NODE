export const bodyToChallenge = (body) => {
    return {
        missionId: body.missionId,
    };
};

export const responseFromChallenge = (challenge) => {
    return {
        challengeId: challenge.challenge_id,
        missionId: challenge.mission_id,
        status: challenge.status,
    };
};