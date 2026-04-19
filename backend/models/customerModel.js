import db from "../config/db.js";

export const createCustomer = async (customer) => {
  const { name, email, phone, address } = customer;

  const [result] = await db.query(
    "INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)",
    [name, email, phone, address]
  );

  return result;
};