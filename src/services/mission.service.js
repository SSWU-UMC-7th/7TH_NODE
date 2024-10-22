// src/services/mission.service.js
import { addMission } from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";

export const missionSignUp = async (data) => {
    const missionId = await addMission(data);
    if (!missionId) {
        throw new Error("미션을 추가할 수 없습니다.");
    }
    return responseFromMission({ missionId, ...data });
};
