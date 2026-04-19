import db from "../config/db.js";

export const createUser = async (email, passwordHash, fullname, phone, role = "customer") => {
  const query = "INSERT INTO users (email, password_hash, fullname, phone, role) VALUES (?, ?, ?, ?, ?)";
  const result = await db.query(query, [email, passwordHash, fullname, phone, role]);
  return result;
};

export const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = ?";
  const [rows] = await db.query(query, [email]);
  return rows[0];
};

export const getUserById = async (id) => {
  const query = "SELECT id, email, fullname, phone, role, created_at FROM users WHERE id = ?";
  const [rows] = await db.query(query, [id]);
  return rows[0];
};

export const getAllUsers = async () => {
  const query = "SELECT id, email, fullname, phone, role, created_at FROM users";
  const [rows] = await db.query(query);
  return rows;
};

export const updateUser = async (id, email, fullname, phone, role) => {
  const query = "UPDATE users SET email = ?, fullname = ?, phone = ?, role = ? WHERE id = ?";
  await db.query(query, [email, fullname, phone, role, id]);
};

export const deleteUser = async (id) => {
  const query = "DELETE FROM users WHERE id = ?";
  await db.query(query, [id]);
};
