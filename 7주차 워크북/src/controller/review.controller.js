// src/controller/review.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { reviewSignUp } from "../services/review.service.js";

export const handleReviewSignUp = async (req, res, next) => {
    try {
        const review = await reviewSignUp(bodyToReview(req.body));
        res.status(StatusCodes.CREATED).json({ result: review });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};