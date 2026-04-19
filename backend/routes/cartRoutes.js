import express from "express";
import * as CartController from "../controllers/cartController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/add", authenticateToken, CartController.addToCart);
router.get("/", authenticateToken, CartController.getCart);
router.delete("/:cartItemId", authenticateToken, CartController.removeFromCart);
router.put("/:cartItemId", authenticateToken, CartController.updateCartItem);
router.post("/checkout", authenticateToken, CartController.checkout);

export default router;
