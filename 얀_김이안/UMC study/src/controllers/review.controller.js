import { reviewSignUp } from "../services/review.service.js";

export const handleReviewSignUp = async (req, res) => {
    try {
        const reviewData = req.body;
        console.log(req.body);
        const reivew = await reivewSignUp(reivewData);
        res.status(201).json(reivew);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};