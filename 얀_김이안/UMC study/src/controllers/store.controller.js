import { storeSignUp, listStoreReviews } from "../services/store.service.js";
import { StatusCodes } from "http-status-codes";

export const handleListStoreReviews = async (req, res) => {
  /*
    #swagger.summary = '상점 리뷰 목록 조회 API';
    #swagger.responses[200] = {
      description: "상점 리뷰 목록 조회 성공 응답",
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
                        id: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        user: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        content: { type: "string" }
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
  */
  
  try {
    const reviews = await listStoreReviews(
      parseInt(req.params.storeId, 10),
      typeof req.query.cursor === "string" ? parseInt(req.query.cursor, 10) : 0
    );
    res.status(StatusCodes.OK).json({ success: true, data: reviews });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: '리뷰 목록 조회에 실패했습니다.' });
  }
};

export const handleStoreSignUp = async (req, res) => {
  try {
    const storeData = req.body;
    const store = await storeSignUp(storeData);
    res.status(StatusCodes.CREATED).json({ success: true, data: store });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: err.message });
  }
};
