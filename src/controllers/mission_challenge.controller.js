import {
  missionChallengeSignUp,
  getOngoingMissionsService,
} from "../services/mission_challenge.service.js";

export const handleMissionChallengeSignUp = async (req, res) => {
  try {
    const challengeData = req.body;
    const challenge = await missionChallengeSignUp(challengeData);
    res.status(201).json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const handleOngoingMissions = async (req, res, next) => {
  console.log("진행 중인 미션 목록 조회 요청을 받았습니다!");
  console.log("params:", req.params); // userId가 잘 들어오는지 확인하기 위한 테스트용

  try {
    const userId = parseInt(req.params.userId, 10);
    const missions = await getOngoingMissionsService(userId);

    res.status(StatusCodes.OK).json({ success: true, data: missions });
  } catch (error) {
    console.error("Error fetching ongoing missions:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to fetch ongoing missions" });
    next(error);
  }
};
