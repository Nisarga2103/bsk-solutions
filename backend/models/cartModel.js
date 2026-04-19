import db from "../config/db.js";

export const addToCart = async (customerId, productId, quantity, type = "purchase", rentalStartDate = null, rentalEndDate = null) => {
  const query = "INSERT INTO cart_items (customer_id, product_id, quantity, type, rental_start_date, rental_end_date) VALUES (?, ?, ?, ?, ?, ?)";
  const result = await db.query(query, [customerId, productId, quantity, type, rentalStartDate, rentalEndDate]);
  return result;
};

export const getCartItems = async (customerId) => {
  const query = `SELECT ci.*, p.name, p.price, p.rental_price_per_day, p.image_url FROM cart_items ci 
                 JOIN products p ON ci.product_id = p.id WHERE ci.customer_id = ?`;
  const [rows] = await db.query(query, [customerId]);
  return rows;
};

export const removeFromCart = async (cartItemId) => {
  const query = "DELETE FROM cart_items WHERE id = ?";
  const result = await db.query(query, [cartItemId]);
  return result;
};

export const updateCartItem = async (cartItemId, quantity) => {
  const query = "UPDATE cart_items SET quantity = ? WHERE id = ?";
  const result = await db.query(query, [quantity, cartItemId]);
  return result;
};

export const clearCart = async (customerId) => {
  const query = "DELETE FROM cart_items WHERE customer_id = ?";
  const result = await db.query(query, [customerId]);
  return result;
};
