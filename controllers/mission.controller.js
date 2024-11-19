import {
  missionSignUp,
  getUserMissionsService,
} from "../services/mission.service.js";

export const handleMissionSignUp = async (req, res) => {
  try {
    const missionData = req.body;
    const mission = await missionSignUp(missionData);
    res.status(201).json(mission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const handleUserMissions = async (req, res, next) => {
  console.log("미션 목록 조회 요청을 받았습니다!");
  console.log("params:", req.params); // userId가 잘 들어오는지 확인하기 위한 테스트용

  /*
    #swagger.summary = '사용자 미션 목록 조회 API';
    #swagger.responses[200] = {
      description: "사용자 미션 목록 조회 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        missionId: { type: "number", description: "미션 ID", example: 101 },
                        missionName: { type: "string", description: "미션 이름", example: "달리기 10km" },
                        status: { type: "string", description: "미션 상태", example: "COMPLETED" },
                        startDate: { type: "string", format: "date", description: "미션 시작 날짜", example: "2024-01-01" },
                        endDate: { type: "string", format: "date", description: "미션 종료 날짜", example: "2024-01-10" }
                      }
                    }
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      cursor: { type: "number", nullable: true, description: "다음 페이지의 커서 정보", example: null }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[500] = {
      description: "서버 에러 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Failed to fetch user missions" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
*/

  try {
    const userId = parseInt(req.params.userId, 10);
    const missions = await getUserMissionsService(userId);

    res.status(StatusCodes.OK).json({ success: true, data: missions });
  } catch (error) {
    console.error("Error fetching user missions:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to fetch user missions" });
    next(error);
  }
};
