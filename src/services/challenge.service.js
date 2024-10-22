// src/services/challenge.service.js
import { addChallenge } from "../repositories/challenge.repository.js";
import { responseFromChallenge } from "../dtos/challenge.dto.js";

export const challengeSignUp = async (data) => {
    const userMissionId = await addChallenge(data);

    if (!userMissionId) {
        throw new Error("미션 도전에 실패했습니다.");
    }

    return responseFromChallenge({ userMissionId, ...data });
};
