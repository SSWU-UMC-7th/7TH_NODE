// src/controller/store.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToStore } from "../dtos/store.dto.js";
import { storeSignUp } from "../services/store.service.js";

export const handleStoreSignUp = async (req, res, next) => {
    try {
        const store = await storeSignUp(bodyToStore(req.body));
        res.status(StatusCodes.CREATED).json({ result: store });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};
