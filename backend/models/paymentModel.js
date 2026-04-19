import db from "../config/db.js";

export const createPayment = async (payment) => {
  const { customer_id, rental_id, amount, payment_method, payment_status } = payment;

  const [result] = await db.query(
    `INSERT INTO payments (customer_id, rental_id, amount, payment_method, payment_status)
     VALUES (?, ?, ?, ?, ?)`,
    [customer_id, rental_id, amount, payment_method, payment_status]
  );

  return result;
};