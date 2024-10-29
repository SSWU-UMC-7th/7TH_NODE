// src/repositories/store.repository.js
import { prisma } from "../db.config.js";

export const addStore = async (data) => {
  const result = await prisma.stores.create({
    data: {
      store_name: data.storeName,
      store_address: data.address,
      region_id: data.regionId,
    },
  });
  return result.id;
};


//ORM 형식으로 변경 