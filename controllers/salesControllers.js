import SaleModel from "../models/SaleModel.js";
import ProductModel from "../models/ProductModel.js";

export const createSale = async (req, res) => {
  try {
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
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
