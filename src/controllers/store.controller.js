import { storeSignUp } from "../services/store.service.js";
import { listStoreReviews } from "../services/store.service.js";

export const handleStoreSignUp = async (req, res) => {
  try {
    const storeData = req.body;
    const store = await storeSignUp(storeData);
    res.status(201).json(store);
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
