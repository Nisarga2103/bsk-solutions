import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, getUserByEmail, getUserById } from "../models/userModel.js";


// ================= REGISTER =================
export const register = async (req, res) => {
  try {
    const { email, password, fullname, phone, role = "customer" } = req.body;

    if (!email || !password || !fullname || !phone) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await createUser(email, passwordHash, fullname, phone, role);

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


// ================= USER LOGIN =================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPassword = await bcrypt.compare(password, user.password_hash);
    if (!isPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // ✅ include role
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        phone: user.phone,
        role: user.role // ✅ important
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


// ================= ADMIN LOGIN =================
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await getUserByEmail(email);

    // ❌ if not admin → reject
    if (!user || user.role !== "admin") {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }

    const isPassword = await bcrypt.compare(password, user.password_hash);
    if (!isPassword) {
      return res.status(401).json({ error: "Invalid admin credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role }, // ✅ include role
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullname: user.fullname,
        phone: user.phone,
        role: user.role // ✅ critical for redirect
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


// ================= PROFILE =================
export const getProfile = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ send clean object (IMPORTANT for frontend)
    res.json({
      id: user.id,
      email: user.email,
      fullname: user.fullname,
      phone: user.phone,
      role: user.role
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};