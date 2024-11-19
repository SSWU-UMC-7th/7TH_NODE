import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { storeSignUp, listStoreReviews } from "../services/store.service.js";

export const handleStoreSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '상점 등록 API';
    #swagger.description = '새로운 상점을 등록하는 API입니다.';
    #swagger.tags = ['Stores'];
    #swagger.requestBody = {
      description: '상점 등록에 필요한 데이터',
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeName: { type: "string", description: "상점 이름", example: "Awesome Cafe" },
              address: { type: "string", description: "상점 주소", example: "123 Coffee Street" },
              regionId: { type: "integer", description: "지역 ID", example: 1 }
            }
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "상점 등록 성공",
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
                  storeId: { type: "integer", example: 1 },
                  storeName: { type: "string", example: "Awesome Cafe" },
                  address: { type: "string", example: "123 Coffee Street" },
                  regionId: { type: "integer", example: 1 },
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
  */
  try {
    const store = await storeSignUp(bodyToStore(req.body));
    res.status(StatusCodes.CREATED).success(store);
  } catch (error) {
    next(error); // 전역 오류 핸들러로 오류 전달
  }
};

export const handleListStoreReviews = async (req, res, next) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.description = '특정 상점의 리뷰 목록을 조회하는 API입니다.';
    #swagger.tags = ['Stores'];
    #swagger.parameters['storeId'] = {
      in: 'path',
      description: '조회할 상점의 ID',
      required: true,
      schema: {
        type: 'integer',
        example: 1
      }
    };
    #swagger.parameters['cursor'] = {
      in: 'query',
      description: '페이지네이션을 위한 커서',
      required: false,
      schema: {
        type: 'integer',
        example: 0
      }
    };
    #swagger.responses[200] = {
      description: "리뷰 목록 조회 성공",
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
                        reviewId: { type: "integer", example: 1 },
                        userId: { type: "integer", example: 1 },
                        storeId: { type: "integer", example: 1 },
                        rating: { type: "integer", example: 5 },
                        reviewText: { type: "string", example: "Great place!" },
                        createdAt: { type: "string", format: "date-time", example: "2024-10-28T13:01:39.000Z" },
                        user: {
                          type: "object",
                          properties: {
                            userName: { type: "string", example: "testuser1" },
                            email: { type: "string", example: "testuser1@example.com" },
                            gender: { type: "string", example: "남성" },
                            birth: { type: "string", format: "date", example: "1990-01-01T00:00:00.000Z" },
                            address: { type: "string", example: "Seoul, South Korea" },
                            detailAddress: { type: "string", example: "101-202" },
                            phoneNumber: { type: "string", example: "010-1234-5678" }
                          }
                        },
                        store: {
                          type: "object",
                          properties: {
                            storeName: { type: "string", example: "Test Store" }
                          }
                        }
                      }
                    }
                  },
                  pagination: {
                    type: "object",
                    properties: {
                      cursor: { type: "integer", nullable: true, example: 4 }
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
              error: { type: "string", example: "Invalid storeId" }
            }
          }
        }
      }
    };
  */
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : 0;
    const reviews = await listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).success(reviews);
  } catch (error) {
    next(error);
  }
};
