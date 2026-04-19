import db from "../config/db.js";

export const createOrder = async (customerId, totalAmount, shippingAddress) => {
  const query = "INSERT INTO orders (customer_id, total_amount, shipping_address, payment_status) VALUES (?, ?, ?, 'pending')";
  const result = await db.query(query, [customerId, totalAmount, shippingAddress]);
  return result;
};

export const getOrderById = async (id) => {
  const query = "SELECT * FROM orders WHERE id = ?";
  const [rows] = await db.query(query, [id]);
  return rows[0];
};

export const getOrdersByCustomer = async (customerId) => {
  const query = "SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC";
  const [rows] = await db.query(query, [customerId]);
  return rows;
};

export const getAllOrders = async () => {
  const query = "SELECT o.*, u.fullname, u.email FROM orders o JOIN users u ON o.customer_id = u.id ORDER BY o.created_at DESC";
  const [rows] = await db.query(query);
  return rows;
};

export const updateOrderPaymentStatus = async (orderId, status) => {
  const query = "UPDATE orders SET payment_status = ? WHERE id = ?";
  const result = await db.query(query, [status, orderId]);
  return result;
};

export const addOrderItem = async (orderId, productId, quantity, price) => {
  const query = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)";
  const result = await db.query(query, [orderId, productId, quantity, price]);
  return result;
};

export const getOrderItems = async (orderId) => {
  const query = `SELECT oi.*, p.name, p.image_url FROM order_items oi 
                 JOIN products p ON oi.product_id = p.id WHERE oi.order_id = ?`;
  const [rows] = await db.query(query, [orderId]);
  return rows;
};
export const updateOrderStatus = async (orderId, status) => {
  const query = "UPDATE orders SET order_status = ? WHERE id = ?";
  const result = await db.query(query, [status, orderId]);
  return result;
};