export const bodyToMission = (body) => {
  return {
    storeId: body.storeId,
    name: body.name,
    description: body.description || "",
    startDate: body.startDate,
    endDate: body.endDate,
    reward: body.reward,
  };
};

export const responseFromMission = (mission) => {
  return {
    missionId: mission.mission_id,
    storeId: mission.store_id,
    name: mission.name,
    description: mission.description,
    startDate: mission.start_date,
    endDate: mission.end_date,
    reward: mission.reward,
    status: mission.status,
    createdAt: mission.created_at,
    updatedAt: mission.updated_at,
  };
};
