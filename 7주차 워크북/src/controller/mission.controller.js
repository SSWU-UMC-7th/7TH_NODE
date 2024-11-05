import { StatusCodes } from "http-status-codes";
import {
  missionSignUp,
  listStoreMissions,
  listUserInProgressMissions,
  markMissionAsCompleted
} from "../services/mission.service.js";
import { bodyToMission } from "../dtos/mission.dto.js";

export const handleMissionSignUp = async (req, res, next) => {
  try {
    const mission = await missionSignUp(bodyToMission(req.body));
    res.status(StatusCodes.CREATED).success(mission);
  } catch (error) {
    next(error); // 전역 오류 핸들러로 오류 전달
  }
};

export const handleListStoreMissions = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : 0;
    const missions = await listStoreMissions(storeId, cursor);
    res.status(StatusCodes.OK).success(missions);
  } catch (error) {
    next(error);
  }
};

export const handleListUserInProgressMissions = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : 0;
    const missions = await listUserInProgressMissions(userId, cursor);
    res.status(StatusCodes.OK).success(missions);
  } catch (error) {
    next(error);
  }
};

export const handleCompleteUserMission = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const missionId = parseInt(req.params.missionId, 10);

    const result = await markMissionAsCompleted(userId, missionId);
    res.status(StatusCodes.OK).success(result);
  } catch (error) {
    next(error);
  }
};
