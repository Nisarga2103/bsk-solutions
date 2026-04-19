import express from "express";
import * as ProductController from "../controllers/productcontroller.js";
import { authenticateToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.post("/", authenticateToken, isAdmin, ProductController.createProduct);
router.put("/:id", authenticateToken, isAdmin, ProductController.updateProduct);
router.delete("/:id", authenticateToken, isAdmin, ProductController.deleteProduct);

export default router;