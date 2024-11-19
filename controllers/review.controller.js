import { reviewSignUp } from "../services/review.service.js";
import { listStoreReviews } from "../services/review.service.js";

export const handleReviewSignUp = async (req, res) => {
  /*
    #swagger.summary = '리뷰 등록 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userId: { type: "string", description: "리뷰를 등록하는 사용자의 ID" },
              reviewContent: { type: "string", description: "리뷰 내용" },
              rating: { type: "number", description: "리뷰 점수", example: 4.5 }
            },
            required: ["userId", "reviewContent", "rating"]
          }
        }
      }
    };
    #swagger.responses[201] = {
      description: "리뷰 등록 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              id: { type: "string", description: "생성된 리뷰 ID" },
              userId: { type: "string", description: "리뷰를 등록한 사용자 ID" },
              reviewContent: { type: "string", description: "등록된 리뷰 내용" },
              rating: { type: "number", description: "등록된 리뷰 점수" }
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
    const reviewData = req.body;
    console.log(req.body);
    const review = await reviewSignUp(reviewData);
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const handleListStoreReviews = async (req, res, next) => {
  const reviews = await listStoreReviews(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};
