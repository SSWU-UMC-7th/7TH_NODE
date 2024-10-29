// src/controller/mission.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { missionSignUp } from "../services/mission.service.js";
import { listStoreMissions } from '../services/mission.service.js';
import { listUserInProgressMissions } from '../services/mission.service.js';
import { markMissionAsCompleted } from '../services/mission.service.js';

export const handleMissionSignUp = async (req, res, next) => {
    try {
        const mission = await missionSignUp(bodyToMission(req.body));
        res.status(StatusCodes.CREATED).json({ result: mission });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
};

export const handleListStoreMissions = async (req, res) => {
  try {
    const storeId = parseInt(req.params.storeId, 10); // URL에서 storeId 가져오기
    const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : 0; // cursor 기본값 설정
    const missions = await listStoreMissions(storeId, cursor);
    res.status(StatusCodes.OK).json(missions);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '미션 조회에 실패했습니다.' });
  }
};

export const handleListUserInProgressMissions = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10); // URL에서 userId 가져오기
    const cursor = req.query.cursor ? parseInt(req.query.cursor, 10) : 0; // 페이지네이션을 위한 cursor 설정
    const missions = await listUserInProgressMissions(userId, cursor);
    res.status(StatusCodes.OK).json(missions);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: '진행 중인 미션 목록 조회에 실패했습니다.' });
  }
};


export const handleCompleteUserMission = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10); // URL에서 userId 가져오기
    const missionId = parseInt(req.params.missionId, 10); // URL에서 missionId 가져오기

    const result = await markMissionAsCompleted(userId, missionId);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message || '미션 완료 처리에 실패했습니다.' });
  }
};