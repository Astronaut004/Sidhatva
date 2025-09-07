import { createCategory, getAllActiveCategories, getAllCategories, getCategoryById, getCategoriesWithProductCount, getCategoryBySlug, updateCategory, deleteCategory } from "../services/productCategoryService.js";

import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createCategoryHandler = asyncHandler(async (req, res) => {
    const {name, description, seo_title, is_active} = req.body;
    const created_by = req.user.id;
    const category = await createCategory({name, description, seo_title, is_active, userId: req.user.id,});
    res.json(new ApiResponse(200, category, "Category created successfully"));
});

export const getAllActiveCategoriesHandler = asyncHandler(async (req, res) => {
  const { limit, offset, search } = req.query;
  const result = await getAllActiveCategories({ limit, offset, search });
  res.json(new ApiResponse(200, result, "Active categories fetched successfully"));
});

export const getAllCategoriesHandler = asyncHandler(async (req, res) => {
  const { includeInactive, limit, offset } = req.query;

  const result = await getAllCategories({
    includeInactive: includeInactive === "true",
    limit,
    offset
  });

  res.json(new ApiResponse(200, result, "Categories fetched successfully"));
});

export const getCategoryBySlugHandler = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const result = await getCategoryBySlug({ slug });

  res.json(new ApiResponse(200, result, result.message || "Category fetched successfully"));
});

export const updateCategoryHandler = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {name, description, seo_title, is_active} = req.body;
    const result  = await updateCategory({id, name, description, seo_title, is_active});
    res.json(new ApiResponse(200, result, result.message || "Category updated successfully"));
});

export const deleteCategoryHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { soft } = req.query;

  const result = await deleteCategory({
    id,
    soft: soft !== "false"
  });

  res.json(new ApiResponse(200, result, result.message));
});

export const getCategoryByIdHandler = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await getCategoryById({ id });

  res.json(new ApiResponse(200, result, result.message || "Category fetched successfully"));
});