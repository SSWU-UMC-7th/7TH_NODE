import { reviewSignUp } from "../services/review.service.js";
import { listStoreReviews } from "../services/review.service.js";

export const handleReviewSignUp = async (req, res) => {
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
