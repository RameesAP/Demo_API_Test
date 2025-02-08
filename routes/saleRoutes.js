import express from "express";

import { createSale } from "../controllers/salesControllers.js";

const router = express.Router();

router.post("/create-sale", createSale);

export default router;
