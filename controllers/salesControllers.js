import SaleModel from "../models/SaleModel.js";
import ProductModel from "../models/ProductModel.js";

export const createSale = async (req, res) => {
  try {
    console.log("User from requestrrrrrrrrrrrrrrrr:", req.user); 
    const { productId, quantity } = req.body;
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ msg: "Insufficient stock" });
    }
    const totalAmount = product.price * quantity;

    const newSale = new SaleModel({
      product: productId,
      customer: req.user.id,
      quantity,
      totalAmount,
    });

    const sale = await newSale.save();

    // Update product stock
    product.stock -= quantity;
    await product.save();
    res.status(201).json(sale);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

//get all sales
export const getSales = async (req, res) => {
  try {
    const sales = await SaleModel.find()
    .populate("product", "name price")
    .populate("customer", "name email");
    res.json(sales);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};