// src/dtos/mission.dto.js
export const bodyToMission = (body) => {
    return {
        regionId: body.regionId,
        description: body.description,
        missionStatus: body.missionStatus
    };
};

export const responseFromMission = (mission) => ({
    missionId: mission.id,
    description: mission.description,
    status: mission.mission_status,
    createdAt: mission.created_at,
    region: mission.region
      ? {
          regionId: mission.region.id,
          regionName: mission.region.region_name,
        }
      : null,
  });
  
  export const responseFromMissions = (missions) => ({
    data: missions.map((mission) => responseFromMission(mission)),
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  });


  