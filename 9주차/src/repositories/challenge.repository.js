import { prisma } from "../db.config.js";

export const addChallenge = async (data) => {
  const existing = await prisma.user_missions.findFirst({
    where: {
      userId: data.userId,
      missionId: data.missionId,
      status: 'IN_PROGRESS',
    },
  });

  if (existing) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  const result = await prisma.user_missions.create({
    data: {
      user: {
        connect: { id: data.userId },
      },
      mission: {
        connect: { id: data.missionId },
      },
      store: {
        connect: { id: data.storeId },
      },
      point: {
        create: {
          userId: data.userId,
          points: 0, // 도전 중일 때 초기 포인트 설정
        },
      },
      status: data.status,
    },
  });

  return result.id;
};
//ORM 형식으로 변경 