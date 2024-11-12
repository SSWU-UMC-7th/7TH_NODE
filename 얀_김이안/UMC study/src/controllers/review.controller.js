// review.controller.js
import { reviewSignUp } from "../services/review.service.js";
import { StatusCodes } from "http-status-codes";

export const handleReviewSignUp = async (req, res) => {
  /*
      #swagger.summary = '리뷰 등록 API';
      #swagger.description = '상점에 대한 리뷰를 등록하는 API입니다.';
      #swagger.requestBody = {
          required: true,
          content: {
              "application/json": {
                  schema: {
                      type: "object",
                      properties: {
                          storeId: { type: "number", example: 1 },
                          userId: { type: "number", example: 2 },
                          content: { type: "string", example: "상점에 대한 훌륭한 리뷰" }
                      },
                      required: ["storeId", "userId", "content"]
                  }
              }
          }
      };
      #swagger.responses[201] = {
          description: '리뷰 등록 성공',
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
                                  storeId: { type: "number", example: 1 },
                                  userId: { type: "number", example: 2 },
                                  content: { type: "string", example: "상점에 대한 훌륭한 리뷰" },
                                  createdAt: { type: "string", format: "date-time", example: "2024-11-12T12:34:56Z" }
                              }
                          }
                      }
                  }
              }
          }
      };
      #swagger.responses[500] = {
          description: '서버 오류 발생',
          content: {
              "application/json": {
                  schema: {
                      type: "object",
                      properties: {
                          success: { type: "boolean", example: false },
                          error: { type: "string", example: "리뷰 등록에 실패했습니다." }
                      }
                  }
              }
          }
      };
    */

  try {
      const reviewData = req.body;
      const review = await reviewSignUp(reviewData);
      res.status(StatusCodes.CREATED).json({ success: true, data: review });
  } catch (err) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: err.message });
  }
};
