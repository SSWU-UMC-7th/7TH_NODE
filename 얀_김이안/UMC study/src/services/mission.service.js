import { 
    getStoreMissions, 
    addMission, 
    updateMissionStatus, 
    deleteMission, 
    completeUserMission 
} from '../repositories/mission.repository.js';
import { 
    responseFromMissions, 
    responseFromMission 
} from '../dtos/mission.dto.js';

// 특정 storeId에 속한 미션 목록을 가져오는 서비스
export const listStoreMissions = async (storeId, cursor) => {
    const missions = await getStoreMissions(storeId, cursor);
    return responseFromMissions(missions); // 변환된 미션 데이터 반환
};

// 새로운 미션을 추가하는 서비스
export const createMission = async (storeId, title, description, pointsReward) => {
    const mission = await addMission(storeId, title, description, pointsReward);
    return responseFromMission(mission); // 변환된 미션 데이터 반환
};

// 미션 상태를 업데이트하는 서비스
export const updateMissionCompletion = async (missionId, isCompleted) => {
    const mission = await updateMissionStatus(missionId, isCompleted ? 'yes' : 'no');
    return responseFromMission(mission); // 변환된 미션 데이터 반환
};

// 특정 미션을 삭제하는 서비스
export const removeMission = async (missionId) => {
    const mission = await deleteMission(missionId);
    return responseFromMission(mission); // 삭제된 미션 데이터 반환
};

// 특정 사용자의 미션을 완료 상태로 업데이트하는 서비스
export const markMissionAsCompleted = async (userId, missionId) => {
    const result = await completeUserMission(userId, missionId);
    if (result.count === 0) {
        throw new Error('해당 미션을 찾을 수 없거나 이미 완료된 상태입니다.');
    }
    return { message: '미션이 완료되었습니다.' };
};
