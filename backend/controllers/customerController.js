import { createCustomer } from "../models/customerModel.js";

export const addCustomer = async (req, res) => {
  try {
    const result = await createCustomer(req.body);
    res.json(result);
  } catch {
    res.status(500).json({ message: "Error" });
  }
};