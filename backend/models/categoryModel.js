import db from "../config/db.js";

export const getCategories = async () => {
  const [rows] = await db.query("SELECT * FROM categories");
  return rows;
};

export const createCategory = async (name) => {
  const [result] = await db.query(
    "INSERT INTO categories (name) VALUES (?)",
    [name]
  );
  return result;
};