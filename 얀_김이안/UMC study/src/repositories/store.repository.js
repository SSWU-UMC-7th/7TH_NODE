import {pool} from "../db.config.js";

// Store 데이터 삽입하기
export const addStore = async (data) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await conn.query(
            `INSERT INTO store (name, address, phone_number) VALUES (?, ?, ?);`,
            [data.name]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했습니다: ${err}`);
    } finally {
        conn.release();
    }
};

// Store 정보 얻기
export const getStoreById = async (storeId) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM store WHERE id = ?;`, []);
        return rows.length > 0 ? rows[0] : null;
    } catch (err) {
        throw new Error(`오류가 발생했습니다: ${err}`);
    } finally {
        conn.release();
    }
};

// Store 존재 여부 확인
export const storeExists = async (storeId) => {
    const conn = await pool.getConnection();
    try {
        const [rows] = await conn.query(`SELECT * FROM store WHERE id = ?;`, [storeId,]);
        return rows.length > 0;
    } catch (err) {
        throw new Error(`오류가 발생했습니다: ${err}`);
    } finally {
        conn.release();
    }
};