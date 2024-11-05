import { missionChallengeSignUp } from "../services/mission_challenge.service.js";

export const handleMissionChallengeSignUp = async (req, res) => {
  try {
    const challengeData = req.body;
    const challenge = await missionChallengeSignUp(challengeData);
    res.status(201).json(challenge);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
