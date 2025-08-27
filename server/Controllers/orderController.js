import asyncHandler from '../utils/asyncHandler.js';
import * as orderService from '../services/orderService.js';
import ApiResponse from '../utils/apiResponse.js';

const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const orderData = req.body;
  const newOrder = await orderService.createOrderFromCart(userId, orderData);
  res.status(201).json(new ApiResponse(201, newOrder, "Order placed successfully."));
});

const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const orders = await orderService.getUserOrders(userId);
  res.status(200).json(new ApiResponse(200, orders, "Orders retrieved successfully."));
});

export default { createOrder, getUserOrders };