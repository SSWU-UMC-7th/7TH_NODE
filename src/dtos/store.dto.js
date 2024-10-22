// src/dtos/store.dto.js
export const bodyToStore = (body) => {
    return {
        storeName: body.storeName,
        address: body.address,
        regionId: body.regionId,
    };
};

export const responseFromStore = (store) => {
    return {
        storeId: store.storeId,
        storeName: store.storeName,
        address: store.address,
        regionId: store.regionId,
    };
};
