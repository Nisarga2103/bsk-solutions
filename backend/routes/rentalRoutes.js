import express from "express";
import { addRental, getRentals, updateRental } from "../controllers/rentalController.js";

const router = express.Router();

router.get("/", getRentals);
router.post("/", addRental);
router.put("/:id", updateRental);

export default router;