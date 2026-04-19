import { getAllUsers, createUser, updateUser as updateUserModel, deleteUser as deleteUserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const addUser = async (req, res) => {
  try {
    const { email, password, fullname, phone, role } = req.body;

    if (!email || !password || !fullname || !phone || !role) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    await createUser(email, passwordHash, fullname, phone, role);

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, fullname, phone, role } = req.body;

    await updateUserModel(id, email, fullname, phone, role);

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const removeUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserModel(id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};