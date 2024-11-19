import { StatusCodes } from "http-status-codes";
import {
  missionSignUp,
  listStoreMissions,
  listUserInProgressMissions,
  markMissionAsCompleted
} from "../services/mission.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";

export const handleMissionSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '미션 등록 API';
    #swagger.description = '새로운 미션을 등록하는 API입니다.';
    #swagger.tags = ['Missions'];
    #swagger.requestBody = {
      description: '미션 등록에 필요한 데이터',
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              regionId: { type: "integer", description: "지역 ID", example: 1 },
              missionStatus: { type: "string", description: "미션 상태", example: "IN_PROGRESS" },
              description: { type: "string", description: "미션 설명", example: "Discover Seoul's best coffee shops" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 등록 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              success: {
                type: "object",
                properties: {
                  missionId: { type: "integer", example: 1 },
                  regionId: { type: "integer", example: 1 },
                  missionStatus: { type: "string", example: "IN_PROGRESS" },
                  description: { type: "string", example: "Discover Seoul's best coffee shops" },
                  createdAt: { type: "string", format: "date-time", example: "2024-10-28T13:01:39.000Z" }
                }
              }
            }
          }
        }
      }
    };
  */
  try {
    const mission = await missionSignUp(bodyToMission(req.body));
    res.status(StatusCodes.CREATED).success(mission);
  } catch (error) {
    next(error);
  }
};

export const handleListStoreMissions = async (req, res, next) => {
  /*
    #swagger.summary = '상점 미션 목록 조회 API';
    #swagger.description = '특정 상점에서 진행 중인 미션 목록을 조회합니다.';
    #swagger.tags = ['Missions'];
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '조회할 상점의 ID',
      required: true,
      schema: { type: 'integer', example: 1 }
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이지네이션 커서',
      required: false,
      schema: { type: 'integer', example: 0 }
    };
    #swagger.responses[200] = {
      description: "미션 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    missionId: { type: "integer", example: 1 },
                    title: { type: "string", example: "첫 번째 미션" },
                    description: { type: "string", example: "미션 설명" },
                    pointsReward: { type: "integer", example: 100 }
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
    res.status(StatusCodes.OK).success(missions);
  } catch (error) {
    next(error);
  }
};

export const handleListUserInProgressMissions = async (req, res, next) => {
  /*
    #swagger.summary = '진행 중인 사용자 미션 목록 조회 API';
    #swagger.description = '사용자가 진행 중인 미션의 목록을 조회합니다.';
    #swagger.tags = ['Missions'];
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '사용자 ID',
      required: true,
      schema: { type: 'integer', example: 1 }
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이지네이션 커서',
      required: false,
      schema: { type: 'integer', example: 0 }
    };
    #swagger.responses[200] = {
      description: "진행 중인 미션 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              success: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    missionId: { type: "integer", example: 1 },
                    status: { type: "string", example: "IN_PROGRESS" },
                    description: { type: "string", example: "Discover Seoul's best coffee shops" }
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
    const userId = parseInt(req.params.userId, 10);
    const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : 0;
    const missions = await listUserInProgressMissions(userId, cursor);
    res.status(StatusCodes.OK).success(missions);
  } catch (error) {
    next(error);
  }
};

export const handleCompleteUserMission = async (req, res, next) => {
  /*
    #swagger.summary = '사용자 미션 완료 API';
    #swagger.description = '사용자가 진행 중인 미션을 완료 상태로 변경합니다.';
    #swagger.tags = ['Missions'];
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '사용자 ID',
      required: true,
      schema: { type: 'integer', example: 1 }
    };
    #swagger.parameters['missionId'] = {
      in: 'path',
      description: '완료할 미션 ID',
      required: true,
      schema: { type: 'integer', example: 1 }
    };
    #swagger.responses[200] = {
      description: "미션 완료 처리 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              success: {
                type: "object",
                properties: {
                  missionId: { type: "integer", example: 1 },
                  userId: { type: "integer", example: 1 },
                  status: { type: "string", example: "COMPLETED" }
                }
              }
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
    res.status(StatusCodes.OK).success(result);
  } catch (error) {
    next(error);
  }
};

