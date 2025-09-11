import asyncHandler from "../utils/asyncHandler.js";
import { createProduct, getAllActiveProducts, getAllProducts, getProductsByCategory, getProductBySlug, updateProduct, deleteProduct } from "../services/productService.js";
import ApiResponse from "../utils/apiResponse.js";

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private (Admin)
 */
export const createProductHandler = asyncHandler(async (req, res) => {
  const data = req.body;
  // call service
  const product = await createProduct(data);
  res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});


export const getAllActiveProductsHandler = asyncHandler(async (req, res) => {
  const { limit, offset, search, is_active } = req.query;

  const result = await getAllActiveProducts({
    limit: limit ? parseInt(limit) : 10,
    offset: offset ? parseInt(offset) : 0,
    search: search || "",
    is_active:
      is_active !== undefined ? is_active === "true" : true,
  });

  res.json(new ApiResponse(200, result, "Products fetched successfully"));
});

export const getAllProductsHandler = asyncHandler(async (req, res) => {
  const { limit, offset, search } = req.query;

  const result = await getAllProducts({
    limit: limit ? parseInt(limit, 10) : 10,
    offset: offset ? parseInt(offset, 10) : 0,
    search,
  });

  res.json(new ApiResponse(200, result, "Products fetched successfully"));
});

export const getProductsByCategoryHandler = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;
  const { limit, offset, search, is_active } = req.query;

  const result = await getProductsByCategory({
    categoryId: parseInt(categoryId),
    limit: limit ? parseInt(limit, 10) : 10,
    offset: offset ? parseInt(offset, 10) : 0,
    search,
    is_active: is_active !== undefined ? is_active === "true" : true,
  });

  res.json(new ApiResponse(200, result, "Products fetched successfully by category"));
});

export const getProductBySlugHandler = asyncHandler(async (req,res) => {
  const { slug } = req.params;
  const product = await getProductBySlug(slug);
  res.json(new ApiResponse(200, product, "Product fetched successfully"));
});



export const updateProductHandler = asyncHandler(async (req, res) => {
  const {id} = req.params;
    const updatedProduct = await updateProduct({
    id: parseInt(id),
    data: req.body,
  });
  res.json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

export const deleteProductHandler = asyncHandler(async (req, res) => {
  const {id} = req.params;
  const {soft} = req.query;
  const result = await deleteProduct({
    id: parseInt(id),
    soft: soft !== "false",
  });
  res.json(new ApiResponse(200, result, result.message));
});