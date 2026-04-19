import db from "../config/db.js";

export const getAllProducts = async (category = null) => {
  let query = "SELECT * FROM products";
  if (category) {
    query += " WHERE category = ?";
    const [rows] = await db.query(query, [category]);
    return rows;
  }
  const [rows] = await db.query(query);
  return rows;
};

export const getProductById = async (id) => {
  const query = "SELECT * FROM products WHERE id = ?";
  const [rows] = await db.query(query, [id]);
  return rows[0];
};

export const createProduct = async (name, description, category, price, stock, rental_available, rental_price_per_day, image_url) => {
  const query = "INSERT INTO products (name, description, category, price, stock, rental_available, rental_price_per_day, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const result = await db.query(query, [name, description, category, price, stock, rental_available, rental_price_per_day, image_url]);
  return result;
};

export const updateProduct = async (id, name, description, category, price, stock, rental_available, rental_price_per_day, image_url) => {
  const query = "UPDATE products SET name = ?, description = ?, category = ?, price = ?, stock = ?, rental_available = ?, rental_price_per_day = ?, image_url = ? WHERE id = ?";
  const result = await db.query(query, [name, description, category, price, stock, rental_available, rental_price_per_day, image_url, id]);
  return result;
};

export const deleteProduct = async (id) => {
  const query = "DELETE FROM products WHERE id = ?";
  const result = await db.query(query, [id]);
  return result;
};

export const getProductsByCategory = async (category) => {
  const query = "SELECT * FROM products WHERE category = ?";
  const [rows] = await db.query(query, [category]);
  return rows;
};