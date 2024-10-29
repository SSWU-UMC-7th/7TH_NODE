// src/services/mission.service.js
import { addMission } from "../repositories/mission.repository.js";
import { responseFromMission } from "../dtos/mission.dto.js";
import { getStoreMissions } from '../repositories/mission.repository.js';
import { responseFromMissions } from '../dtos/mission.dto.js'; // responseFromMissions를 import
import { getUserInProgressMissions } from '../repositories/mission.repository.js';
import { completeUserMission } from '../repositories/mission.repository.js';

export const missionSignUp = async (data) => {
    const missionId = await addMission(data);
    if (!missionId) {
        throw new Error("미션을 추가할 수 없습니다.");
    }
    return responseFromMission({ missionId, ...data });
};

export const listStoreMissions = async (storeId, cursor) => {
    const missions = await getStoreMissions(storeId, cursor);
    return responseFromMissions(missions); // 변환된 미션 데이터 반환
};


export const listUserInProgressMissions = async (userId, cursor) => {
    const missions = await getUserInProgressMissions(userId, cursor);
    return responseFromMissions(missions); // 변환된 미션 데이터 반환
};


export const markMissionAsCompleted = async (userId, missionId) => {
    const result = await completeUserMission(userId, missionId);
    if (result.count === 0) {
      throw new Error('해당 미션을 찾을 수 없거나 이미 완료된 상태입니다.');
    }
    return { message: '미션이 완료되었습니다.' };
  };