// mission.controller.js
import { 
    listStoreMissions, 
    createMission, 
    markMissionAsCompleted, 
    removeMission 
} from '../services/mission.service.js';
import { StatusCodes } from 'http-status-codes';

export const handleListStoreMissions = async (req, res) => {
    try {
        const storeId = parseInt(req.params.storeId, 10);
        const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : 0;
        const missions = await listStoreMissions(storeId, cursor);
        res.status(StatusCodes.OK).json({ success: true, data: missions });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: '미션 목록 조회에 실패했습니다.' });
    }
};

export const handleCreateMission = async (req, res) => {
    try {
        const storeId = parseInt(req.params.storeId, 10);
        const { title, description, pointsReward } = req.body;
        const mission = await createMission(storeId, title, description, pointsReward);
        res.status(StatusCodes.CREATED).json({ success: true, data: mission });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: '미션 추가에 실패했습니다.' });
    }
};

export const handleUpdateMissionCompletion = async (req, res) => {
    try {
        const userId = parseInt(req.params.userId, 10);
        const missionId = parseInt(req.params.missionId, 10);
        const result = await markMissionAsCompleted(userId, missionId);
        res.status(StatusCodes.OK).json({ success: true, data: result });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message || '미션 완료 처리에 실패했습니다.' });
    }
};

export const handleRemoveMission = async (req, res) => {
    try {
        const missionId = parseInt(req.params.missionId, 10);
        const mission = await removeMission(missionId);
        res.status(StatusCodes.OK).json({ success: true, data: mission });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: '미션 삭제에 실패했습니다.' });
    }
};
