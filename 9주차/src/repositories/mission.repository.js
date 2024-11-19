import { prisma } from "../db.config.js";

export const addMission = async (data) => {
  const missionData = {
    region: {
      connect: { id: data.regionId },
    },
    description: data.description,
    mission_status: data.missionStatus,
  };

  // storeId가 존재하는 경우에만 store를 연결합니다.
  if (data.storeId) {
    missionData.store = {
      connect: { id: data.storeId },
    };
  }

  const result = await prisma.missions.create({
    data: missionData,
  });
  return result.id;
};

//ORM 형식으로 변경 

export const getStoreMissions = async (storeId, cursor = 0) => {
  const missions = await prisma.missions.findMany({
    select: {
      id: true,
      description: true,     // 미션 설명
      mission_status: true,  // 미션 상태
      created_at: true,      // 생성일
      region: {
        select: { id: true, region_name: true }, // 지역 정보
      },
    },
    where: { storeId: storeId }, // storeId로 필터링
    orderBy: { id: "asc" },
    take: 5,
  });
  console.log("Store Missions found:", missions); // 쿼리 결과 로그
  return missions;
};//가게 미션 목록 

export const getUserInProgressMissions = async (userId, cursor = 0) => {
  const missions = await prisma.user_missions.findMany({
    where: {
      userId: userId,
      status: 'IN_PROGRESS', // 진행 중인 미션만 조회
    },
    select: {
      mission: {
        select: {
          id: true,
          description: true,
          mission_status: true,
          created_at: true,
          region: {
            select: { id: true, region_name: true },
          },
        },
      },
    },
    orderBy: { missionId: "asc" },
    take: 10,
    skip: cursor,
  });
  return missions.map((userMission) => userMission.mission);
};//유저 미션 진행 목록 


export const completeUserMission = async (userId, missionId) => {
  return await prisma.user_missions.updateMany({
    where: {
      userId: userId,
      missionId: missionId,
      status: 'IN_PROGRESS', // 진행 중인 미션만 업데이트
    },
    data: {
      status: 'COMPLETED',
      completed_at: new Date(), // 완료 시간 기록
    },
  });
};


