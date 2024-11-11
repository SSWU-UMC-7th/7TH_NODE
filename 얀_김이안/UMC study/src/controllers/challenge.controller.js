import { challengeSignUp } from "../services/challenge.service.js";

export const handleChallengeSignUp = async (req, res) => {
    try {
        const challengeData = req.body;
        const challenge = await challengeSignUp(challengeData);
        res.status(201).json(challenge);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};