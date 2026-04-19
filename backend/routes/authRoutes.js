import express from "express";
import { register, login, adminLogin, getProfile } from "../controllers/authController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin-login", adminLogin);
router.get("/profile", authenticateToken, getProfile);

export default router;
