import { StatusCodes } from "http-status-codes";
import { bodyToUser,bodyToUserLogin  } from "../dtos/user.dto.js";
import { userSignUp, listUserReviews,userLogin } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '사용자 회원가입 API';
    #swagger.description = '새로운 사용자를 등록하는 API입니다.';
    #swagger.tags = ['Users'];
    #swagger.requestBody = {
      description: '사용자 회원가입에 필요한 데이터',
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userName: { type: "string", description: "사용자 이름", example: "John Doe" },
              email: { type: "string", description: "사용자 이메일", example: "johndoe@example.com" },
              password: { type: "string", description: "사용자 비밀번호", example: "password123" },
              gender: { type: "string", description: "성별", example: "남성" },
              birth: { type: "string", format: "date", description: "생년월일", example: "1990-01-01" },
              address: { type: "string", description: "주소", example: "Seoul, South Korea" },
              phoneNumber: { type: "string", description: "전화번호", example: "010-1234-5678" }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "사용자 회원가입 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              success: {
                type: "object",
                properties: {
                  userId: { type: "integer", example: 1 },
                  userName: { type: "string", example: "John Doe" },
                  email: { type: "string", example: "johndoe@example.com" },
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
    console.log("회원가입 요청");
    console.log("body:", req.body); // 테스트용 로그
  
    try {
      // 요청 데이터를 DTO로 변환
      const signUpData = bodyToUser(req.body);
  
      // 회원가입 처리
      const user = await userSignUp(signUpData);
  
      // 성공 응답 반환
      res.status(StatusCodes.CREATED).success(user);
    } catch (error) {
      // 오류 응답 처리
      next(error);
    }
};

export const handleUserLogin = async (req, res, next) => {
  console.log("로그인을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

  try {
    // 요청된 데이터를 DTO로 변환
    const loginData = bodyToUserLogin(req.body);

    // 로그인 처리
    const loginResult = await userLogin(loginData);

    // 성공 응답
    res.status(StatusCodes.OK).success(loginResult);
  } catch (error) {
    // 실패 응답
    next(error);
  }
};


export const handleListUserReviews = async (req, res, next) => {
  /*
    #swagger.summary = '사용자 리뷰 목록 조회 API';
    #swagger.description = '특정 사용자가 작성한 리뷰 목록을 조회하는 API입니다.';
    #swagger.tags = ['Users'];
    #swagger.parameters['userId'] = {
      in: 'path',
      description: '조회할 사용자 ID',
      required: true,
      schema: { type: 'integer', example: 1 }
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이지네이션을 위한 커서',
      required: false,
      schema: { type: 'integer', example: 0 }
    };
    #swagger.responses[200] = {
      description: "리뷰 목록 조회 성공",
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
                    reviewId: { type: "integer", example: 1 },
                    storeId: { type: "integer", example: 1 },
                    rating: { type: "integer", example: 5 },
                    reviewText: { type: "string", example: "Amazing coffee and cozy atmosphere!" },
                    createdAt: { type: "string", format: "date-time", example: "2024-10-28T13:01:39.000Z" },
                    store: {
                      type: "object",
                      properties: {
                        storeName: { type: "string", example: "Test Store" }
                      }
                    }
                  }
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
              error: { type: "string", example: "Invalid userId" }
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
    const userId = parseInt(req.params.userId, 10);
    const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : 0;
    const reviews = await listUserReviews(userId, cursor);
    res.status(StatusCodes.OK).success(reviews);
  } catch (error) {
    next(error);
  }
};
