import asyncHandler from '../utils/asyncHandler.js';
import * as reviewService from '../services/reviewService.js';
import ApiResponse from '../utils/apiResponse.js';

const createReview = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;
  const reviewData = req.body;
  const newReview = await reviewService.createReview(userId, productId, reviewData);
  res.status(201).json(new ApiResponse(201, newReview, "Thank you for your review."));
});

const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const reviews = await reviewService.getProductReviews(productId);
  res.status(200).json(new ApiResponse(200, reviews, "Reviews retrieved successfully."));
});

export default { createReview, getProductReviews };