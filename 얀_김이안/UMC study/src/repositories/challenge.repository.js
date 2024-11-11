import {pool} from "../db.config.js";

// Challenge 데이터 삽입
export const addChallenge = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `INSERT INTO review (mission_id) VALUES (?);`,
            [data.missionId]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했습니다: ${err}`);
    } finally {
        conn.release();
    }
};

// Challenge 정보 얻기
export const getChallengeById = async (challengeId) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM challenge WHERE challenge_id = ?;`,
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
export const isChallengeExists = async (missionId) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM challenge WHERE challenge_id = ? AND status = 'ongoing';`,
            [challengeId]
        );
        return rows.length > 0;
    } catch (err) {
        throw new Error(`오류가 발생했습니다: ${err}`);
    } finally {
        conn.release();
    }
};