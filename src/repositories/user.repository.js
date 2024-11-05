import { pool } from "../db.config.js";
import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.user.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await prisma.user.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userEmail) => {
  const conn = await pool.getConnection();

  try {
    const [rows] = await conn.query(
      `SELECT * FROM user WHERE email = ?;`,
      [userEmail] // userEmail을 배열로 전달해야 합니다
    );

    if (rows.length === 0) {
      return null;
    }

    return rows[0]; // 단일 사용자 정보를 반환할 때는 첫 번째 결과만 반환
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userEmail, foodCategoryId) => {
  const conn = await pool.getConnection();

  try {
    await pool.query(
      `INSERT INTO user_favor_category (food_category_id, user_email) VALUES (?, ?);`,
      [foodCategoryId, userEmail]
    );

    return;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userEmail) => {
  const conn = await pool.getConnection();

  try {
    const [preferences] = await pool.query(
      "SELECT user_favor_category.food_category_id, user_favor_category.user_email, food_category.name " +
        "FROM user_favor_category JOIN food_category on user_favor_category.food_category_id = food_category.id " +
        "WHERE user_favor_category.user_email = ? ORDER BY user_favor_category.food_category_id ASC;",
      userEmail
    );

    return preferences;
  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};
