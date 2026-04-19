import * as ProductModel from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const { category, search } = req.query;
    let products = await ProductModel.getAllProducts();

    if (category) {
      products = products.filter(p => p.category === category);
    }

    if (search) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, rental_available, rental_price_per_day, image_url } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ error: "name, category, and price are required" });
    }

    await ProductModel.createProduct(name, description, category, price, stock, rental_available, rental_price_per_day, image_url);
    res.status(201).json({ message: "Product created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, rental_available, rental_price_per_day, image_url } = req.body;

    await ProductModel.updateProduct(req.params.id, name, description, category, price, stock, rental_available, rental_price_per_day, image_url);
    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await ProductModel.deleteProduct(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};