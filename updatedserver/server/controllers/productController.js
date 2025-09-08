import asyncHandler from "../utils/asyncHandler.js";
import * as productService from "../services/productService.js";
import ApiResponse from "../utils/apiResponse.js";

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private (Admin)
 */
export const createProductHandler = asyncHandler(async (req, res) => {
  const data = req.body;

  // call service
  const product = await productService.createProduct(data);

  res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});
