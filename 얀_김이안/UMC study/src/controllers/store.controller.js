// store.controller.js
import { storeSignUp, listStoreReviews } from "../services/store.service.js";
import { StatusCodes } from "http-status-codes";

export const handleListStoreReviews = async (req, res) => {
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
