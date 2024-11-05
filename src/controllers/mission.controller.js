import { missionSignUp } from "../services/mission.service.js";

export const handleMissionSignUp = async (req, res) => {
  try {
    const missionData = req.body;
    const mission = await missionSignUp(missionData);
    res.status(201).json(mission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
