import { prisma } from "../db.config.js";

export const addChallenge = async (data) => {
  const existing = await prisma.user_missions.findFirst({
    where: {
      user_id: data.userId,
      mission_id: data.missionId,
      status: '진행 중',
    },
  });

  if (existing) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  const result = await prisma.user_missions.create({
    data: {
      user_id: data.userId,
      mission_id: data.missionId,
      store_id: data.storeId,
      status: data.status,
    },
  });

  return result.id;
};

//ORM 형식으로 변경 