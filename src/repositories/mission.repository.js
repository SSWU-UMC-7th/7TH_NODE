import { poolW5 } from "../db.config.js";

// Mission 데이터 삽입
export const addMission = async (data) => {
  const conn = await poolW5.getConnection();
  try {
    const [result] = await conn.query(
      `INSERT INTO mission (store_id, name, description, start_date, end_date, reward) VALUES (?, ?, ?, ?, ?, ?);`,
      [
        data.storeId,
        data.name,
        data.description,
        data.startDate,
        data.endDate,
        data.reward,
      ]
    );
    return result.insertId;
  } catch (err) {
    throw new Error(`오류가 발생했습니다: ${err}`);
  } finally {
    conn.release();
  }
};

// Mission 정보 얻기
export const getMissionById = async (missionId) => {
  const conn = await poolW5.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT * FROM mission WHERE mission_id = ?;`,
      [missionId]
    );
    return rows.length > 0 ? rows[0] : null;
  } catch (err) {
    throw new Error(`오류가 발생했습니다: ${err}`);
  } finally {
    conn.release();
  }
};
