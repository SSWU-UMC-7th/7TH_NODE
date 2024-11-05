import {
  addStore,
  getStoreById,
  getAllStoreReviews,
} from "../repositories/store.repository.js";
import { responseFromStore, responseFromReviews } from "../dtos/store.dto.js";

export const storeSignUp = async (data) => {
  const storeId = await addStore({
    name: data.name,
    address: data.address,
    phoneNumber: data.phoneNumber,
  });

  if (!storeId) {
    throw new Error("Store 등록에 실패했습니다.");
  }

  const store = await getStoreById(storeId);
  return responseFromStore({ store });
};

export const listStoreReviews = async (storeId) => {
  const reviews = await getAllStoreReviews(storeId);
  return responseFromReviews(reviews);
};
