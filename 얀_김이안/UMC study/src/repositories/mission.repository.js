import { prisma } from "../db.config.js";

// 특정 userId의 진행 중인 미션 목록 조회
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
          title: true,
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
};

// 특정 storeId의 미션 목록 조회
export const getStoreMissions = async (storeId, cursor = 0) => {
  const missions = await prisma.mission.findMany({
    where: { storeId: storeId }, // storeId로 필터링
    select: {
      id: true,
      title: true,
      description: true,
      points_reward: true,
      is_completed: true,
      created_at: true,
      region: {
        select: { id: true, region_name: true },
      },
    },
    orderBy: { id: "asc" },
    take: 10,
    skip: cursor,
  });
  return missions;
};

// 새로운 미션 추가
export const addMission = async (storeId, title, description, pointsReward) => {
  const newMission = await prisma.mission.create({
    data: {
      title,
      description,
      points_reward: pointsReward,
      is_completed: 'no', // 기본값 설정
      storeId: storeId,   // storeId 설정
    },
  });
  return newMission;
};

// 미션 완료 상태 업데이트
export const updateMissionStatus = async (missionId, isCompleted) => {
  const updatedMission = await prisma.mission.update({
    where: { id: missionId },
    data: { is_completed: isCompleted },
  });
  return updatedMission;
};

// 미션 삭제
export const deleteMission = async (missionId) => {
  const deletedMission = await prisma.mission.delete({
    where: { id: missionId },
  });
  return deletedMission;
};

// 특정 사용자의 진행 중인 미션을 완료 상태로 업데이트
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
