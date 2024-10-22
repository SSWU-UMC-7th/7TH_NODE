// src/repositories/review.repository.js
import { pool } from "../db.config.js";

export const addReview = async (data) => {
    const conn = await pool.getConnection();

    try {
        const [result] = await pool.query(
            `INSERT INTO reviews (user_id, store_id, rating, review_text) VALUES (?, ?, ?, ?);`,
            [data.userId, data.storeId, data.rating, data.reviewText]
        );
        return result.insertId;
    } catch (err) {
        throw new Error(`오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};

export const checkStoreExists = async (storeId) => {
    const conn = await pool.getConnection();

    try {
        const [rows] = await pool.query(
            `SELECT 1 FROM stores WHERE store_id = ?;`,
            [storeId]
        );
        return rows.length > 0;
    } catch (err) {
        throw new Error(`오류가 발생했습니다. 요청 파라미터를 확인해주세요. (${err})`);
    } finally {
        conn.release();
    }
};
