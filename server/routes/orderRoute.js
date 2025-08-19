// temporary test change

import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  cancelOrder
} from "../Controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.put("/:id", updateOrder);
router.put("/:id/cancel", cancelOrder);

export default router;

