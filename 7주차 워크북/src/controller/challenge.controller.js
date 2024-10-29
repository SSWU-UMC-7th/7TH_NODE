// src/controller/challenge.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToChallenge } from "../dtos/challenge.dto.js";
import { challengeSignUp } from "../services/challenge.service.js";

export const handleChallengeSignUp = async (req, res, next) => {
    try {
        const challenge = await challengeSignUp(bodyToChallenge(req.body));
        res.status(StatusCodes.CREATED).json({ result: challenge });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};