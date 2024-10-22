// src/repositories/store.repository.js
import { pool } from "../db.config.js";

export const addStore = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await pool.query(
            `INSERT INTO stores (store_name, store_address, region_id) VALUES (?, ?, ?);`,
            [data.storeName, data.address, data.regionId]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};
