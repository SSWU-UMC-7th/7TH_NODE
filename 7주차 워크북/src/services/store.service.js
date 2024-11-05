// src/services/store.service.js
import { addStore } from "../repositories/store.repository.js";
import { responseFromStore } from "../dtos/store.dto.js";
import { getAllStoreReviews } from '../repositories/user.repository.js'; 
import {responseFromReviews} from '../dtos/review.dto.js'

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

export const listStoreReviews = async (storeId, cursor) => {
  const reviews = await getAllStoreReviews(storeId, cursor);
  console.log("Raw reviews from DB:", reviews); // 리뷰 배열이 제대로 반환되는지 확인
  return responseFromReviews(reviews); // 리뷰 배열을 변환하여 반환
};