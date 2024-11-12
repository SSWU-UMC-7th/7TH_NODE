import { addStore, getStoreById } from "../repositories/store.repository.js";
import { responseFromStore } from "../dtos/store.dto.js";
import { DuplicateStoreNameError } from "../errors.js";

export const storeSignUp = async (data) => {
  const storeId = await addStore({
    name: data.name,
    address: data.address,
    phoneNumber: data.phoneNumber,
  });

  if (!storeId) {
    throw new DuplicateStoreNameError("Store 등록에 실패했습니다.", data);
  }

  const store = await getStoreById(storeId);
  return responseFromStore({ store });
};
