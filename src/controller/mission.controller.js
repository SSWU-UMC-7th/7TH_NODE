// src/controller/mission.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { missionSignUp } from "../services/mission.service.js";

export const handleMissionSignUp = async (req, res, next) => {
    try {
        const mission = await missionSignUp(bodyToMission(req.body));
        res.status(StatusCodes.CREATED).json({ result: mission });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};
