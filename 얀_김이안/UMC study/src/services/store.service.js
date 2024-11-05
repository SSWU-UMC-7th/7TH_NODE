import { addStore, getStoreById, getAllStoreReviews } from "../repositories/store.repository.js";
import { responseFromStore, responseFromReviews } from "../dtos/store.dto.js";
import { StoreReivewError, StoreError } from "../errors.js";

export const listStoreReviews = async (storeId) => {
    const reviews = await getAllStoreReviews(storeId);
    if (!reviews) {
        throw new StoreReivewError("가게 리뷰를 불러오는 데 실패했습니다.", { storeId });
    }
    return responseFromReviews(reviews);
};

export const storeSignUp = async (data) => {
    const storeId = await addStore({ name: data.name });

    if (!storeId) {
        throw new StoreError("가게 등록에 실패했습니다.", data);
    }

    const store = await getStoreById(storeId);
    if (!store) {
        throw new StoreError("가게 정보를 불러오는 데 실패했습니다.", { storeId });
    }

    return responseFromStore(store);
};
