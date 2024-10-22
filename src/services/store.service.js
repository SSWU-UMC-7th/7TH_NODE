// src/services/store.service.js
import { addStore } from "../repositories/store.repository.js";
import { responseFromStore } from "../dtos/store.dto.js";

export const storeSignUp = async (data) => {
    const storeId = await addStore({
        storeName: data.storeName,
        address: data.address,
        regionId: data.regionId,
    });

    if (!storeId) {
        throw new Error("가게를 추가할 수 없습니다.");
    }

    return responseFromStore({ storeId, ...data });
};
