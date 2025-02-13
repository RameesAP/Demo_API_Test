import ProductModel from "../models/ProductModel.js";

export const createProduct = async (req, res) => {
  try {
    const { name, description, price,NewPrice, stock } = req.body;
    const product = await ProductModel.create({
      name,
      description,
      price,
      NewPrice,
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

export const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;

    const deleteProduct = await ProductModel.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res.status(400).json({ message: "Product not found" });
    }
    res.status(201).json({
      status: "success",
      message: "Product deleted successfully",
      deleteProduct
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

//update product
export const updateProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const { name, description, price, stock } = req.body;

    const updateProduct = await ProductModel.findByIdAndUpdate(id, {name, description, price, stock}, {new: true});

    if (!updateProduct) {
      return res.status(400).json({ message: "Product not found" });
    }
    res.status(201).json({
      status: "success",
      message: "Product updated successfully",
      updateProduct
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}