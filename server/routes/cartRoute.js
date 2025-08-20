import express from "express";
import { authenticate, addCartItem, getCartItems, updateCartItem, removeCartItem, clearCart } from "../Controllers/cartController.js";

const router = express.Router();

router.post("/", authenticate, addCartItem);
router.get("/", authenticate, getCartItems);
router.put("/:id", authenticate, updateCartItem);
router.delete("/:id", authenticate, removeCartItem);
router.delete("/", authenticate, clearCart);

export default router;



