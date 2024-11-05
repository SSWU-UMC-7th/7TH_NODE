export const bodyToMissionChallenge = (body) => {
  return {
    userEmail: body.userEmail,
    missionId: body.missionId,
  };
};

export const responseFromMissionChallenge = (challenge) => {
  return {
    challengeId: challenge.challenge_id,
    userEmail: challenge.user_email,
    missionId: challenge.mission_id,
    status: challenge.status,
    startDate: challenge.start_date,
    completedAt: challenge.completed_at,
    createdAt: challenge.created_at,
    updatedAt: challenge.updated_at,
  };
};
