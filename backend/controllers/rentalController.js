import { createRental, getAllRentals, updateRentalStatus } from "../models/rentalModel.js";

export const getRentals = async (req, res) => {
  try {
    const rentals = await getAllRentals();
    res.json(rentals);
  } catch (error) {
    console.error("getRentals error:", error);
    res.status(500).json({ message: "Error fetching rentals" });
  }
};

export const addRental = async (req, res) => {
  try {
    const result = await createRental(req.body);
    res.json(result);
  } catch (error) {
    console.error("addRental error:", error);
    res.status(500).json({ message: "Error creating rental", error: error.message });
  }
};

export const updateRental = async (req, res) => {
  try {
    const { status } = req.body;
    await updateRentalStatus(req.params.id, status);
    res.json({ message: "Rental status updated" });
  } catch (error) {
    console.error("updateRental error:", error);
    res.status(500).json({ message: "Error updating rental" });
  }
};