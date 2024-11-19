import { StatusCodes } from "http-status-codes";
import { bodyToChallenge } from "../dtos/challenge.dto.js";
import { challengeSignUp } from "../services/challenge.service.js";

export const handleChallengeSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '챌린지 등록 API';
    #swagger.description = '새로운 챌린지를 등록하는 API입니다.';
    #swagger.tags = ['Challenges'];
    #swagger.requestBody = {
      description: '챌린지 등록에 필요한 데이터',
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "integer", description: "사용자 ID", example: 1 },
              missionId: { type: "integer", description: "미션 ID", example: 1 },
              storeId: { type: "integer", description: "상점 ID", example: 1 },
              status: { type: "string", description: "챌린지 상태", example: "IN_PROGRESS" }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "챌린지 등록 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              success: {
                type: "object",
                properties: {
                  challengeId: { type: "integer", example: 1 },
                  userId: { type: "integer", example: 1 },
                  missionId: { type: "integer", example: 1 },
                  storeId: { type: "integer", example: 1 },
                  status: { type: "string", example: "IN_PROGRESS" },
                  createdAt: { type: "string", format: "date-time", example: "2024-10-28T13:01:39.000Z" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "잘못된 요청 데이터",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: { type: "string", example: "Invalid request data" }
            }
          }
        }
      }
    };
    #swagger.responses[500] = {
      description: "서버 오류",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "ERROR" },
              error: { type: "string", example: "Internal server error" }
            }
          }
        }
      }
    };
  */
  try {
    const challenge = await challengeSignUp(bodyToChallenge(req.body));
    res.status(StatusCodes.CREATED).success(challenge);
  } catch (error) {
    next(error);
  }
};
