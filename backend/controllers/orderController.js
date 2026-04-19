import * as OrderModel from "../models/orderModel.js";

export const getOrder = async (req, res) => {
  try {
    const order = await OrderModel.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    const items = await OrderModel.getOrderItems(req.params.id);
    res.json({ ...order, items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const customerId = req.user.id;
    const orders = await OrderModel.getOrdersByCustomer(customerId);
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.getAllOrders();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: "status required" });
    }
    await OrderModel.updateOrderPaymentStatus(req.params.id, status);
    res.json({ message: "Payment status updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const orderId = req.params.id;

    if (!status) {
      return res.status(400).json({ error: "status required" });
    }

    await OrderModel.updateOrderStatus(orderId, status);

    res.json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};