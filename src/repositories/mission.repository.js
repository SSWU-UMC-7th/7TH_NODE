// src/repositories/mission.repository.js
import { pool } from "../db.config.js";

export const addMission = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await pool.query(
            `INSERT INTO missions (region_id, description, mission_status) VALUES (?, ?, ?);`,
            [data.regionId, data.description, data.missionStatus]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};
