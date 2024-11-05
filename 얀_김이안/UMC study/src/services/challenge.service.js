import { addChallenge, getChallengeById, isChallengeExists } from "../repositories/challenge.repository.js";
import { responseFromChallenge } from "../dtos/challenge.dto.js";
import { ChallengeError } from "../errors.js";

export const challengeSignUp = async (data) => {
    // 도전하려는 미션에 이미 도전 중인지를 확인
    const challengeExists = await isChallengeExists(data.missionId);
    if (challengeExists) {
        return { message: "이미 도전 중인 미션입니다.", missionId: data.missionId };
    }

    // 미션 도전 등록
    const challengeId = await addChallenge({ missionId: data.missionId });
    if (!challengeId) {
        throw new ChallengeError("미션 도전 등록에 실패했습니다.", data);
    }

    const challenge = await getChallengeById(challengeId);
    return responseFromChallenge(challenge);
};
