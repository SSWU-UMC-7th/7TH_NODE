import {
  addMission,
  getMissionById,
} from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";

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
    throw new Error("Mission 등록에 실패했습니다.");
  }

  const mission = await getMissionById(missionId);
  return responseFromMission(mission);
};
