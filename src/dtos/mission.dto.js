// src/dtos/mission.dto.js
export const bodyToMission = (body) => {
    return {
        regionId: body.regionId,
        description: body.description,
        missionStatus: body.missionStatus
    };
};

export const responseFromMission = (mission) => {
    return {
        missionId: mission.missionId,
        regionId: mission.regionId,
        description: mission.description,
        missionStatus: mission.missionStatus
    };
};
