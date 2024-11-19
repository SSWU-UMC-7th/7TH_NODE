import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { reviewSignUp } from "../services/review.service.js";

export const handleReviewSignUp = async (req, res, next) => {
  
  /*
  #swagger.summary = '리뷰 작성 API';
  #swagger.description = '사용자가 특정 상점에 리뷰를 작성하는 API입니다.';
  #swagger.tags = ['Reviews'];
  #swagger.requestBody = {
    description: '리뷰 등록을 위한 요청 데이터',
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            userId: {
              type: "integer",
              description: "리뷰를 작성하는 사용자의 ID",
              example: 1
            },
            storeId: {
              type: "integer",
              description: "리뷰가 작성될 상점의 ID",
              example: 1
            },
            rating: {
              type: "integer",
              description: "상점에 대한 평점 (1~5 사이의 값)",
              example: 5
            },
            reviewText: {
              type: "string",
              description: "리뷰 내용",
              example: "Amazing coffee and cozy atmosphere!"
            }
          }
        }
      }
    }
  };
  #swagger.responses[201] = {
    description: "리뷰 등록 성공",
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
                reviewId: { type: "integer", example: 1 },
                userId: { type: "integer", example: 1 },
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
    const review = await reviewSignUp(bodyToReview(req.body));
    res.status(StatusCodes.CREATED).success(review);
  } catch (error) {
    next(error);
  }
};
