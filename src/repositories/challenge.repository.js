// src/repositories/challenge.repository.js
import { pool } from "../db.config.js";

export const addChallenge = async (data) => {
    const conn = await pool.getConnection();

    try {
        // 중복 도전 확인
        const [existing] = await pool.query(
            `SELECT * FROM user_missions WHERE user_id = ? AND mission_id = ? AND status = '진행 중';`,
            [data.userId, data.missionId]
        );

        if (existing.length > 0) {
            throw new Error("이미 도전 중인 미션입니다.");
        }

        // 도전 추가
        const [result] = await pool.query(
            `INSERT INTO user_missions (user_id, mission_id, store_id, status) VALUES (?, ?, ?, ?);`,
            [data.userId, data.missionId, data.storeId, data.status]
        );

        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};
