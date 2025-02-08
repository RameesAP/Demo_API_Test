import express from "express";
import { protect, restrictToAdmin } from "../middleware/authMiddleware.js";
import { getAllUsers } from "../controllers/adminController.js";
import { createProduct, getAllProducts, getProductById } from "../controllers/ProductController.js";

const router = express.Router();

// Protected admin routes
//router.use(protect, restrictToAdmin); // Apply to all routes below
router.get("/users", protect, restrictToAdmin, getAllUsers);

//products routes
router.post("/create-product", protect, restrictToAdmin, createProduct);

//get all products
router.get("/get-all-products", getAllProducts);

//get one product
router.get("/get-one/:id", getProductById);


export default router;
