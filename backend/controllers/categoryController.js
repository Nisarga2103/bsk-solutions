import { getCategories, createCategory } from "../models/categoryModel.js";

export const getAllCategories = async (req, res) => {
  try {
    const data = await getCategories();
    res.json(data);
  } catch {
    res.status(500).json({ message: "Error" });
  }
};

export const addCategory = async (req, res) => {
  try {
    const result = await createCategory(req.body.name);
    res.json(result);
  } catch {
    res.status(500).json({ message: "Error" });
  }
};