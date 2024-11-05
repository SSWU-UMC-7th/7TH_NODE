import { poolW5 } from "../db.config.js";

// Mission Challenge 데이터 삽입
export const addMissionChallenge = async (data) => {
  const conn = await poolW5.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO mission_challenge (user_email, mission_id) VALUES (?, ?);`,
      [data.userEmail, data.missionId]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했습니다: ${err}`);
  } finally {
    conn.release();
  }
};

// Mission Challenge 정보 얻기
export const getMissionChallengeById = async (challengeId) => {
  const conn = await poolW5.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT * FROM mission_challenge WHERE challenge_id = ?;`,
      [challengeId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류가 발생했습니다: ${err}`);
  } finally {
    conn.release();
  }
};

// 동일 미션에 대해 도전 중인지 확인
export const isMissionChallengeExists = async (userEmail, missionId) => {
  const conn = await poolW5.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT * FROM mission_challenge WHERE user_email = ? AND mission_id = ? AND status = 'ongoing';`,
      [userEmail, missionId]
    );
    return rows.length > 0; // 도전 중이면 true 반환
  } catch (err) {
    throw new Error(`오류가 발생했습니다: ${err}`);
  } finally {
    conn.release();
  }
};
