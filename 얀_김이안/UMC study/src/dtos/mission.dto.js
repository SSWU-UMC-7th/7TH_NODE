// 단일 미션 객체를 클라이언트에 맞춰 포맷
export const responseFromMission = (mission) => ({
    missionId: mission.id,
    title: mission.title,
    description: mission.description,
    pointsReward: mission.points_reward,
    isCompleted: mission.is_completed === 'yes', // Boolean 형태로 변환
    createdAt: mission.created_at,
    storeId: mission.store_id, // store_id 포함
    region: mission.region ? mission.region.region_name : null,
  });
  
  // 다수의 미션 객체를 클라이언트에 맞춰 포맷
  export const responseFromMissions = (missions) => ({
    data: missions.map((mission) => responseFromMission(mission)),
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  });