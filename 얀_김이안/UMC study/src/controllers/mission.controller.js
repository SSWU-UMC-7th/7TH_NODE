// mission.controller.js
import { 
    listStoreMissions, 
    createMission, 
    markMissionAsCompleted, 
    removeMission 
} from '../services/mission.service.js';
import { StatusCodes } from 'http-status-codes';

export const handleListStoreMissions = async (req, res) => {
    /*
      #swagger.summary = '상점 미션 목록 조회 API';
      #swagger.description = '특정 상점의 미션 목록을 조회하는 API입니다.';
      #swagger.parameters['storeId'] = { description: '상점 ID', required: true }
      #swagger.parameters['cursor'] = { description: '페이지네이션을 위한 커서', required: false }
      #swagger.responses[200] = {
          description: '미션 목록 조회 성공',
          content: {
              "application/json": {
                  schema: {
                      type: "object",
                      properties: {
                          success: { type: "boolean", example: true },
                          data: {
                              type: "array",
                              items: {
                                  type: "object",
                                  properties: {
                                      id: { type: "number", example: 1 },
                                      title: { type: "string", example: "첫 번째 미션" },
                                      description: { type: "string", example: "미션 설명" },
                                      pointsReward: { type: "number", example: 100 }
                                  }
                              }
                          }
                      }
                  }
              }
          }
      };
    */

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
    /*
      #swagger.summary = '상점 미션 생성 API';
      #swagger.description = '특정 상점에 새로운 미션을 추가하는 API입니다.';
      #swagger.parameters['storeId'] = { description: '상점 ID', required: true }
      #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      type: "object",
                      properties: {
                          title: { type: "string", example: "새로운 미션" },
                          description: { type: "string", example: "미션 설명" },
                          pointsReward: { type: "number", example: 100 }
                      },
                      required: ["title", "description", "pointsReward"]
                  }
              }
          }
      };
      #swagger.responses[201] = {
          description: '미션 생성 성공',
          content: {
              "application/json": {
                  schema: {
                      type: "object",
                      properties: {
                          success: { type: "boolean", example: true },
                          data: { 
                              type: "object",
                              properties: {
                                  id: { type: "number", example: 1 },
                                  title: { type: "string", example: "새로운 미션" },
                                  description: { type: "string", example: "미션 설명" },
                                  pointsReward: { type: "number", example: 100 }
                              }
                          }
                      }
                  }
              }
          }
      };
    */

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
    /*
      #swagger.summary = '미션 완료 처리 API';
      #swagger.description = '사용자의 특정 미션을 완료 처리하는 API입니다.';
      #swagger.parameters['userId'] = { description: '사용자 ID', required: true }
      #swagger.parameters['missionId'] = { description: '미션 ID', required: true }
      #swagger.responses[200] = {
          description: '미션 완료 처리 성공',
          content: {
              "application/json": {
                  schema: {
                      type: "object",
                      properties: {
                          success: { type: "boolean", example: true },
                          data: { type: "object", example: { message: "미션 완료됨" } }
                      }
                  }
              }
          }
      };
    */

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
    /*
      #swagger.summary = '미션 삭제 API';
      #swagger.description = '특정 미션을 삭제하는 API입니다.';
      #swagger.parameters['missionId'] = { description: '미션 ID', required: true }
      #swagger.responses[200] = {
          description: '미션 삭제 성공',
          content: {
              "application/json": {
                  schema: {
                      type: "object",
                      properties: {
                          success: { type: "boolean", example: true },
                          data: { type: "object", example: { message: "미션 삭제됨" } }
                      }
                  }
              }
          }
      };
    */

    try {
        const missionId = parseInt(req.params.missionId, 10);
        const mission = await removeMission(missionId);
        res.status(StatusCodes.OK).json({ success: true, data: mission });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: '미션 삭제에 실패했습니다.' });
    }
};
