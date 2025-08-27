import asyncHandler from '../utils/asyncHandler.js';
import * as wishlistService from '../services/wishlistService.js';
import ApiResponse from '../utils/apiResponse.js';

const getWishlist = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const wishlist = await wishlistService.getWishlist(userId);
  res.status(200).json(new ApiResponse(200, wishlist, "Wishlist retrieved successfully."));
});

const addItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  if (!productId) {
    res.status(400);
    throw new Error("Product ID is required.");
  }
  const updatedWishlist = await wishlistService.addItemToWishlist(userId, { productId });
  res.status(200).json(new ApiResponse(200, updatedWishlist, "Item added to wishlist."));
});

const removeItem = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { itemId } = req.params;
  const updatedWishlist = await wishlistService.removeItemFromWishlist(userId, itemId);
  res.status(200).json(new ApiResponse(200, updatedWishlist, "Item removed from wishlist."));
});

export default { getWishlist, addItem, removeItem };