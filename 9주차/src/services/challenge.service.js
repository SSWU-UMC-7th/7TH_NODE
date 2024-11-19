// src/services/challenge.service.js
import { addChallenge } from "../repositories/challenge.repository.js";
import { responseFromChallenge } from "../dtos/challenge.dto.js";
import { ChallengeAddError } from "../error.js";

export const challengeSignUp = async (data) => {
    try {
      const userMissionId = await addChallenge(data);
      return responseFromChallenge({ userMissionId, ...data });
    } catch (error) {
      throw new ChallengeAddError("미션 도전에 실패했습니다.", { ...data, reason: error.message });
    }
  };