// routes/authRoutes.js
import express from "express";
import { register, login, sendOtp, verifyOtp, logout } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js"; // JWT verification middleware

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

// Protected route
router.post("/logout", protect, logout);

export default router;