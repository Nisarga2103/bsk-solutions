import * as CartModel from "../models/cartModel.js";
import * as OrderModel from "../models/orderModel.js";
import { getProductById } from "../models/productModel.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity, type = "purchase", rentalStartDate = null, rentalEndDate = null } = req.body;
    const customerId = req.user.id;

    if (!productId || !quantity) {
      return res.status(400).json({ error: "productId and quantity required" });
    }

    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await CartModel.addToCart(customerId, productId, quantity, type, rentalStartDate, rentalEndDate);
    res.status(201).json({ message: "Added to cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getCart = async (req, res) => {
  try {
    const customerId = req.user.id;
    const items = await CartModel.getCartItems(customerId);
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    await CartModel.removeFromCart(req.params.cartItemId);
    res.json({ message: "Removed from cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity) {
      return res.status(400).json({ error: "quantity required" });
    }
    await CartModel.updateCartItem(req.params.cartItemId, quantity);
    res.json({ message: "Cart updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const checkout = async (req, res) => {
  try {
    const { shippingAddress } = req.body;
    const customerId = req.user.id;

    if (!shippingAddress) {
      return res.status(400).json({ error: "shippingAddress required" });
    }

    const cartItems = await CartModel.getCartItems(customerId);
    if (cartItems.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Calculate total
    let totalAmount = 0;
    cartItems.forEach(item => {
      if (item.type === "rental") {
        const start = new Date(item.rental_start_date);
        const end = new Date(item.rental_end_date);
        const days = (end - start) / (1000 * 60 * 60 * 24);
        totalAmount += item.rental_price_per_day * days * item.quantity;
      } else {
        totalAmount += item.price * item.quantity;
      }
    });

    // Create order
    const [result] = await OrderModel.createOrder(customerId, totalAmount, shippingAddress);
    const orderId = result.insertId;

    // Add order items
    for (const item of cartItems) {
      await OrderModel.addOrderItem(orderId, item.product_id, item.quantity, item.price);
    }

    // Clear cart
    await CartModel.clearCart(customerId);

    res.status(201).json({
      orderId,
      totalAmount,
      message: "Order created successfully",
      bankDetails: {
        account_name: "BSK Solutions",
        account_number: "1234567890",
        bank_name: "ABC Bank",
        instructions: "Please transfer the amount and include your order ID in the reference"
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
