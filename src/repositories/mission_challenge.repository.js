import { prisma } from "../db.config.js";

// Add Mission Challenge using Prisma
export const addMissionChallenge = async (data) => {
  try {
    const missionChallenge = await prisma.missionChallenge.create({
      data: {
        userEmail: data.userEmail,
        missionId: data.missionId,
      },
    });
    return missionChallenge.challenge_id;
  } catch (err) {
    throw new Error(`오류가 발생했습니다: ${err.message}`);
  }
};

// Get Mission Challenge by ID using Prisma
export const getMissionChallengeById = async (challengeId) => {
  try {
    const missionChallenge = await prisma.missionChallenge.findUnique({
      where: {
        challenge_id: challengeId,
      },
    });
    return missionChallenge;
  } catch (err) {
    throw new Error(`오류가 발생했습니다: ${err.message}`);
  }
};

// Check if Mission Challenge Exists using Prisma
export const isMissionChallengeExists = async (userEmail, missionId) => {
  try {
    const missionChallenge = await prisma.missionChallenge.findFirst({
      where: {
        userEmail: userEmail,
        missionId: missionId,
        status: "ongoing",
      },
    });
    return missionChallenge !== null; // Return true if challenge exists
  } catch (err) {
    throw new Error(`오류가 발생했습니다: ${err.message}`);
  }
};

export const getOngoingMissions = async (userId) => {
  try {
    return await prisma.mission.findMany({
      where: {
        store: { userId },
        status: "ongoing",
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
