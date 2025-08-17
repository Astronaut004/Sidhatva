// temporary test change

import express from "express";
import * as cartController from "../Controllers/cartController.js";

const router = express.Router();

router.post("/", cartController.addCartItem);
router.get("/:userId", cartController.getCartItems);
router.put("/:id", cartController.updateCartItem);
router.delete("/:id", cartController.removeCartItem);
router.delete("/user/:userId", cartController.clearCart);

export default router;
