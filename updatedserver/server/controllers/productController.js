import asyncHandler from '../utils/asyncHandler.js';
import * as productService from '../services/productService.js';
import ApiResponse from '../utils/apiResponse.js';

const createProduct = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const newProduct = await productService.createProduct(req.body, userId);
  res.status(201).json(new ApiResponse(201, newProduct, 'Product created successfully.'));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await productService.getAllProducts(req.query);
  res.status(200).json(new ApiResponse(200, products));
});

const getProductBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const product = await productService.getProductBySlug(slug);
  res.status(200).json(new ApiResponse(200, product));
});

export default { createProduct, getAllProducts, getProductBySlug };
