import express from "express";
import {
  addOrderItem,
  getOrderItems,
  getOrderItemById,
  updateOrderItem,
  removeOrderItem,
} from "../Controllers/orderItemController.js";

const router = express.Router();
router.post("/", addOrderItem);
router.get("/order/:orderId", getOrderItems);
router.get("/:id", getOrderItemById);
router.put("/:id", updateOrderItem);
router.delete("/:id", removeOrderItem);

export default router;
