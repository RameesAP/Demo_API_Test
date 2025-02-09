import express from "express";

import { createSale, getSales } from "../controllers/salesControllers.js";
import { protect, restrictToAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-sale",protect, createSale);
router.get("/get-sales",protect,restrictToAdmin,getSales);

export default router;
