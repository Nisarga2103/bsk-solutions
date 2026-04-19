import db from "../config/db.js";

export const getAllRentals = async () => {
  const [rows] = await db.query(`
    SELECT rentals.*, products.name AS product_name, products.category AS rental_type, users.fullname AS customer_name
    FROM rentals
    LEFT JOIN products ON rentals.product_id = products.id
    LEFT JOIN users ON rentals.customer_id = users.id
  `);

  return rows;
};

export const createRental = async (rental) => {
  const { customer_id, product_id, start_date, end_date, total_price, status } = rental;

  const [result] = await db.query(
    `INSERT INTO rentals (customer_id, product_id, start_date, end_date, total_cost, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [customer_id, product_id, start_date, end_date, total_price, status]
  );

  return result;
};

export const updateRentalStatus = async (rentalId, status) => {
  const [result] = await db.query(
    "UPDATE rentals SET status = ? WHERE id = ?",
    [status, rentalId]
  );
  return result;
};