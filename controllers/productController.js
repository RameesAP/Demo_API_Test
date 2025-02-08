import ProductModel from "../models/ProductModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const product = await ProductModel.create({
      name,
      description,
      price,
      stock,
    });
    res.status(201).json({
      status: "success",
      product,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(201).json({
      status: "success",
      results: products.length,
      products,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    res.status(201).json({
      status: "success",
      product,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
