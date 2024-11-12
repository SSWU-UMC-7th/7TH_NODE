import {
  addMissionChallenge,
  getMissionChallengeById,
  isMissionChallengeExists,
  getOngoingMissions,
} from "../repositories/mission_challenge.repository.js";
import {
  responseFromMissionChallenge,
  ongoingMissionFromUser,
} from "../dtos/mission_challenge.dto.js";
import {
  MissionAlreadyInProgressError,
  MissionChallengeCreationError,
} from "../errors.js";

export const missionChallengeSignUp = async (data) => {
  // 도전하려는 미션에 이미 도전 중인지 확인
  const challengeExists = await isMissionChallengeExists(
    data.userEmail,
    data.missionId
  );
  if (challengeExists) {
    throw new MissionAlreadyInProgressError("이미 도전 중인 미션입니다.", {
      userId,
      missionId,
    });
  }

  // 미션 도전 등록
  const challengeId = await addMissionChallenge({
    userEmail: data.userEmail,
    missionId: data.missionId,
  });

  if (!challengeId) {
    throw new MissionChallengeCreationError("미션 도전 등록에 실패했습니다.", {
      userId,
      missionId,
      error: error.message, // 실제 에러 메시지 포함
    });
  }

  const challenge = await getMissionChallengeById(challengeId);
  return responseFromMissionChallenge(challenge);
};

export const getOngoingMissionsService = async (userId) => {
  const missions = await getOngoingMissions(userId);
  return missions.map((mission) => ongoingMissionFromUser(mission));
};
