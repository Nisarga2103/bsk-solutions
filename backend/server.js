import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productroutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import rentalRoutes from "./routes/rentalRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Auth routes (public)
app.use("/auth", authRoutes);

// Product routes (public)
app.use("/products", productRoutes);

app.get('/', (req, res) => {
  res.send('BSK Solutions API is running');
});

// Protected routes
app.use("/categories", categoryRoutes);
app.use("/customers", customerRoutes);
app.use("/rentals", rentalRoutes);
app.use("/payments", paymentRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/notifications", notificationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});