// temporary test change

import express from "express";
import { 
  addCartItem, 
  getCartItems, 
  updateCartItem, 
  removeCartItem, 
  clearCart 
} from "../Controllers/cartController.js";

const router = express.Router();

router.post("/", addCartItem);
router.get("/:userId", getCartItems);
router.put("/:id", updateCartItem);
router.delete("/:id", removeCartItem);
router.delete("/user/:userId", clearCart);

export default router;


