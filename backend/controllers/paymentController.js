import { createPayment } from "../models/paymentModel.js";

export const addPayment = async (req, res) => {
  try {
    const result = await createPayment(req.body);
    res.json(result);
  } catch {
    res.status(500).json({ message: "Error" });
  }
};