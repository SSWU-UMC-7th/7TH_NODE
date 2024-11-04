import {addStore, getStoreById} from "../repositories/store.repository.js";
import {responseFromStore} from "../dtos/store.dto.js";

export const listStoreReviews = async (storeId) => {
    const reviews = await getAllStoreReviews(storeId);
    return responseFromReviews(reviews);
  };

export const storeSignUp = async (data) => {
    const storeId = await addStore({
        name: data.name
    });

    if(!storeId) {
        throw new Error("Store 등록에 실패했습니다.");
    }

    const store = await getStoreById(storeId);
    return responseFromStore({store});
}