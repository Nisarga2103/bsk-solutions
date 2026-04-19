import db from "../config/db.js";

export const createNotification = async (user_id, type, title, message) => {
  const query = "INSERT INTO notifications (user_id, type, title, message) VALUES (?, ?, ?, ?)";
  const result = await db.query(query, [user_id, type, title, message]);
  return result;
};

export const getNotifications = async () => {
  const query = "SELECT * FROM notifications ORDER BY created_at DESC";
  const [rows] = await db.query(query);
  return rows;
};

export const markAsRead = async (id) => {
  const query = "UPDATE notifications SET is_read = TRUE WHERE id = ?";
  await db.query(query, [id]);
};

export const deleteNotification = async (id) => {
  const query = "DELETE FROM notifications WHERE id = ?";
  await db.query(query, [id]);
};