import express from "express";
import { getCurrentUser, login, register } from "../controllers/authControllers.js";
import { protect } from "../middleware/authMiddleware.js";
// import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.get("/me", protect, getCurrentUser); 

export default router;
