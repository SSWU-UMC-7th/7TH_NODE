import {
  missionChallengeSignUp,
  getOngoingMissionsService,
} from "../services/mission_challenge.service.js";

export const handleMissionChallengeSignUp = async (req, res) => {
  /*
    #swagger.summary = '미션 챌린지 등록 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "string", description: "미션 챌린지를 등록하는 사용자의 ID" },
              missionId: { type: "string", description: "등록할 미션의 ID" },
              startDate: { type: "string", format: "date", description: "미션 챌린지 시작 날짜" },
              endDate: { type: "string", format: "date", description: "미션 챌린지 종료 날짜" }
            },
            required: ["userId", "missionId", "startDate", "endDate"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "미션 챌린지 등록 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              challengeId: { type: "string", description: "생성된 미션 챌린지 ID" },
              userId: { type: "string", description: "미션 챌린지를 등록한 사용자 ID" },
              missionId: { type: "string", description: "등록된 미션 ID" },
              startDate: { type: "string", format: "date", description: "챌린지 시작 날짜" },
              endDate: { type: "string", format: "date", description: "챌린지 종료 날짜" },
              status: { type: "string", description: "챌린지 상태", example: "ACTIVE" }
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
              message: { type: "string", description: "에러 메시지" }
            }
          }
        }
      }
    };
*/
  try {
    const challengeData = req.body;
    const challenge = await missionChallengeSignUp(challengeData);
    res.status(201).json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const handleOngoingMissions = async (req, res, next) => {
  console.log("진행 중인 미션 목록 조회 요청을 받았습니다!");
  console.log("params:", req.params); // userId가 잘 들어오는지 확인하기 위한 테스트용

  /*
    #swagger.summary = '진행 중인 미션 목록 조회 API';
    #swagger.description = '특정 사용자의 진행 중인 미션 목록을 조회합니다.';
    #swagger.tags = ['User Missions'];
    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      description: '진행 중인 미션을 조회할 사용자의 ID',
      schema: { type: 'integer', example: 1 }
    };
    #swagger.responses[200] = {
      description: "진행 중인 미션 목록 조회 성공 응답",
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
                        missionId: { type: "number", description: "미션 ID", example: 201 },
                        missionName: { type: "string", description: "미션 이름", example: "영어 공부하기" },
                        status: { type: "string", description: "미션 상태", example: "ONGOING" },
                        startDate: { type: "string", format: "date", description: "미션 시작 날짜", example: "2024-11-01" },
                        progress: { type: "number", description: "진행률 (백분율)", example: 75 }
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
                  message: { type: "string", example: "Failed to fetch ongoing missions" }
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
    const missions = await getOngoingMissionsService(userId);

    res.status(StatusCodes.OK).json({ success: true, data: missions });
  } catch (error) {
    console.error("Error fetching ongoing missions:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to fetch ongoing missions" });
    next(error);
  }
};
