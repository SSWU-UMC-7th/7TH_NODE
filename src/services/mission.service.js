import {
  addMission,
  getMissionById,
  getUserMissions,
} from "../repositories/mission.repository.js";
import { responseFromMission, missionFromUser } from "../dtos/mission.dto.js";
import { MissionCreationError } from "../errors.js";

export const missionSignUp = async (data) => {
  const missionId = await addMission({
    storeId: data.storeId,
    name: data.name,
    description: data.description,
    startDate: data.startDate,
    endDate: data.endDate,
    reward: data.reward,
  });

  if (!missionId) {
    throw new MissionCreationError("미션 등록에 실패했습니다.", {
      storeId,
      missionData,
      error: error.message, // 실제 에러 메시지 포함
    });
  }

  const mission = await getMissionById(missionId);
  return responseFromMission(mission);
};

export const getUserMissionsService = async (userId) => {
  const missions = await getUserMissions(userId);
  return missions.map((mission) => new missionFromUser(mission));
};
