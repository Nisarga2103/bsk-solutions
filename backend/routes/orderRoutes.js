import express from "express";
import * as OrderController from "../controllers/orderController.js";
import { authenticateToken, adminOnly } from "../middleware/auth.js";

const router = express.Router();

// 👑 Admin routes (secure) — KEEP FIRST
router.get("/admin/orders", authenticateToken, adminOnly, OrderController.getAllOrders);

router.put(
  "/admin/orders/:id/payment-status",
  authenticateToken,
  adminOnly,
  OrderController.updatePaymentStatus
);

router.put(
  "/admin/orders/:id/status",
  authenticateToken,
  adminOnly,
  OrderController.updateOrderStatus
);

// 👤 User routes
router.get("/my-orders", authenticateToken, OrderController.getMyOrders);
router.get("/:id", authenticateToken, OrderController.getOrder);

export default router;