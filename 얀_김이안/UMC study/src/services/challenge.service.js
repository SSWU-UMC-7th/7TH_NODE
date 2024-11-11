import {addChallenge, getChallengeById, isChallengeExists} from "../repositories/challenge.repository.js";
import {responseFromChallenge} from "../dtos/challenge.dto.js";

export const challengeSignUp = async (data) => {
    // 도전하려는 미션에 이미 도전 중인지를 확인
    const ChallengeExists = await isChallengeExists(
        data.missionId
    );

    if (ChallengeExists) {
        throw new Error("이미 도전 중인 미션");
    }

    // 미션 도전 등록
    const challengeId = await addChallenge({
        missionId: data.missionId,
    });

    if (!challengeId) {
        throw new Error("Mission Challenge 등록에 실패했습니다.");
    }

    const challenge = await getCallengeById(challengeId);
    return responseFromChallenge(challenge);
};