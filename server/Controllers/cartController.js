import asyncHandler from '../utils/asyncHandler.js';
import * as cartService from '../services/cartService.js';
import ApiResponse from '../utils/apiResponse.js';

const getCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const cart = await cartService.getCart(userId);
  res.status(200).json(new ApiResponse(200, cart, "Cart retrieved successfully."));
});

const addItemToCart = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;
  if (!productId || !quantity || quantity < 1) {
    res.status(400);
    throw new Error("Invalid product ID or quantity.");
  }
  const updatedCart = await cartService.addItemToCart(userId, { productId, quantity });
  res.status(200).json(new ApiResponse(200, updatedCart, "Item added to cart successfully."));
});

export default { getCart, addItemToCart };
