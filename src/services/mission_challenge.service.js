import {
  addMissionChallenge,
  getMissionChallengeById,
  isMissionChallengeExists,
} from "../repositories/mission_challenge.repository.js";
import { responseFromMissionChallenge } from "../dtos/mission_challenge.dto.js";

export const missionChallengeSignUp = async (data) => {
  // 도전하려는 미션에 이미 도전 중인지 확인
  const challengeExists = await isMissionChallengeExists(
    data.userEmail,
    data.missionId
  );
  if (challengeExists) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  // 미션 도전 등록
  const challengeId = await addMissionChallenge({
    userEmail: data.userEmail,
    missionId: data.missionId,
  });

  if (!challengeId) {
    throw new Error("Mission Challenge 등록에 실패했습니다.");
  }

  const challenge = await getMissionChallengeById(challengeId);
  return responseFromMissionChallenge(challenge);
};
