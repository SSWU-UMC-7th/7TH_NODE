import { challengeSignUp } from "../services/challenge.service.js";
import { StatusCodes } from "http-status-codes";
import { bodyToChallenge } from "../dtos/challenge.dto.js";

export const handleChallengeSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '챌린지 등록 API';
    #swagger.description = '새로운 챌린지를 등록하는 API입니다.';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              name: { type: "string", example: "새로운 챌린지" },
              description: { type: "string", example: "챌린지 설명" },
              startDate: { type: "string", format: "date", example: "2024-11-12" },
              endDate: { type: "string", format: "date", example: "2024-12-12" },
            },
            required: ["name", "startDate", "endDate"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "챌린지 등록 성공 응답",
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
                  name: { type: "string", example: "새로운 챌린지" },
                  description: { type: "string", example: "챌린지 설명" },
                  startDate: { type: "string", format: "date", example: "2024-11-12" },
                  endDate: { type: "string", format: "date", example: "2024-12-12" }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[500] = {
      description: "서버 오류 발생",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              success: { type: "boolean", example: false },
              error: { type: "string", example: "챌린지 등록에 실패했습니다." }
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
