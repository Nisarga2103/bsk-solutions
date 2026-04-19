import express from "express";
import { getAllNotifications, addNotification, updateNotificationStatus, removeNotification } from "../controllers/notificationController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// All routes require admin authentication
router.use(authenticateToken);
router.use((req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
});

router.get("/", getAllNotifications);
router.post("/", addNotification);
router.put("/:id/read", updateNotificationStatus);
router.delete("/:id", removeNotification);

export default router;