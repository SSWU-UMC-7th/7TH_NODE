import { 
    listStoreMissions, 
    createMission, 
    updateMissionCompletion, // 기존의 이름을 변경하여 일관성 유지
    removeMission, 
    markMissionAsCompleted // 사용자 미션 완료 처리 함수 추가
} from '../services/mission.service.js';
import { StatusCodes } from 'http-status-codes';

// 특정 가게의 미션 목록을 조회하는 컨트롤러
export const handleListStoreMissions = async (req, res) => {
    try {
        const storeId = parseInt(req.params.storeId, 10); // URL에서 storeId 가져오기
        const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : 0; // 페이지네이션을 위한 cursor 설정
        const missions = await listStoreMissions(storeId, cursor);
        res.status(StatusCodes.OK).json(missions);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '미션 목록 조회에 실패했습니다.' });
    }
};

// 새로운 미션을 추가하는 컨트롤러
export const handleCreateMission = async (req, res) => {
    try {
        const storeId = parseInt(req.params.storeId, 10); // URL에서 storeId 가져오기
        const { title, description, pointsReward } = req.body; // 요청 본문에서 데이터 가져오기
        const mission = await createMission(storeId, title, description, pointsReward);
        res.status(StatusCodes.CREATED).json(mission);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '미션 추가에 실패했습니다.' });
    }
};

// 미션 완료 상태를 업데이트하는 컨트롤러
export const handleUpdateMissionCompletion = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10); // URL에서 userId 가져오기
        const missionId = parseInt(req.params.missionId, 10); // URL에서 missionId 가져오기
        const result = await markMissionAsCompleted(userId, missionId); // 미션 완료 처리
        res.status(StatusCodes.OK).json(result);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message || '미션 완료 처리에 실패했습니다.' });
    }
};

// 특정 미션을 삭제하는 컨트롤러
export const handleRemoveMission = async (req, res) => {
    try {
        const missionId = parseInt(req.params.missionId, 10); // URL에서 missionId 가져오기
        const mission = await removeMission(missionId);
        res.status(StatusCodes.OK).json(mission);
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '미션 삭제에 실패했습니다.' });
    }
};
