import { MissionNotFoundError } from "../error.js";
import { addMission, getStoreMissions, getUserInProgressMissions, completeUserMission } from "../repositories/mission.repository.js";
import { responseFromMission, responseFromMissions } from "../dtos/mission.dto.js";

export const missionSignUp = async (data) => {
    const missionId = await addMission(data);
    if (!missionId) {
        throw new MissionNotFoundError("미션을 추가할 수 없습니다.", data);
    }
    return responseFromMission({ missionId, ...data });
};

export const listStoreMissions = async (storeId, cursor) => {
    const missions = await getStoreMissions(storeId, cursor);
    return responseFromMissions(missions);
};

export const listUserInProgressMissions = async (userId, cursor) => {
    const missions = await getUserInProgressMissions(userId, cursor);
    return responseFromMissions(missions);
};

export const markMissionAsCompleted = async (userId, missionId) => {
    const result = await completeUserMission(userId, missionId);
    if (result.count === 0) {
        throw new MissionNotFoundError('해당 미션을 찾을 수 없거나 이미 완료된 상태입니다.', { userId, missionId });
    }
    return { message: '미션이 완료되었습니다.' };
};
