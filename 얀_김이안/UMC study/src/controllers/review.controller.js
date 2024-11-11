// review.controller.js
import { reviewSignUp } from "../services/review.service.js";
import { StatusCodes } from "http-status-codes";

export const handleReviewSignUp = async (req, res) => {
    try {
        const reviewData = req.body;
        const review = await reviewSignUp(reviewData);
        res.status(StatusCodes.CREATED).json({ success: true, data: review });
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: err.message });
    }
};
