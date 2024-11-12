import { prisma } from "../db.config.js";

// Add Mission using Prisma
export const addMission = async (data) => {
  try {
    const mission = await prisma.mission.create({
      data: {
        storeId: data.storeId,
        name: data.name,
        description: data.description,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        reward: data.reward,
      },
    });
    return mission.mission_id;
  } catch (err) {
    throw new Error(`오류가 발생했습니다: ${err.message}`);
  }
};

// Get Mission by ID using Prisma
export const getMissionById = async (missionId) => {
  try {
    const mission = await prisma.mission.findUnique({
      where: {
        mission_id: missionId,
      },
    });
    return mission;
  } catch (err) {
    throw new Error(`오류가 발생했습니다: ${err.message}`);
  }
};

// 미션 목록 조회
export const getUserMissions = async (userId) => {
  try {
    return await prisma.mission.findMany({
      where: {
        store: {
          userId: userId,
        },
      },
      include: {
        store: {
          select: { name: true },
        },
      },
    });
  } catch (error) {
    console.error("오류가 발생했습니다:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
