import express from "express";
import {
  addOrderItem,
  getOrderItems,
  updateOrderItem,
  removeOrderItem,
  getOrderItemById
} from "../Controllers/orderItemController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Apply auth middleware to all routes
router.post("/", authenticate, addOrderItem);
router.get("/:orderId", authenticate, getOrderItems);
router.get("/item/:id", authenticate, getOrderItemById);
router.put("/:id", authenticate, updateOrderItem);
router.delete("/:id", authenticate, removeOrderItem);

export default router;
