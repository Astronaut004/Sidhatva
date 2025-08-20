// temporary test change

import express from "express";
import {
  authenticate,
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  cancelOrder
} from "../Controllers/orderController.js";

const router = express.Router();

router.post("/", authenticate, createOrder);
router.get("/", authenticate, getOrders);
router.get("/:id", authenticate, getOrderById);
router.put("/:id", authenticate, updateOrder);
router.delete("/:id", authenticate, cancelOrder);

export default router;


