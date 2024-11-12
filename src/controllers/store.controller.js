import { storeSignUp } from "../services/store.service.js";

export const handleStoreSignUp = async (req, res) => {
  try {
    const storeData = req.body;
    const store = await storeSignUp(storeData);
    res.status(201).json(store);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
