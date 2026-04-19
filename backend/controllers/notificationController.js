import { createNotification, getNotifications, markAsRead, deleteNotification } from "../models/notificationModel.js";

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await getNotifications();
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const addNotification = async (req, res) => {
  try {
    const { user_id, type, title, message } = req.body;
    await createNotification(user_id, type, title, message);
    res.status(201).json({ message: "Notification created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateNotificationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    await markAsRead(id);
    res.json({ message: "Notification marked as read" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const removeNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteNotification(id);
    res.json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};