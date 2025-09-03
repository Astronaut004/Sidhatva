import { createCategory, getAllActiveCategories, getAllCategories, getCategoryById, getCategoriesWithProductCount, getCategoryBySlug, updateCategory, deleteCategory } from "../services/productCategoryService.js";

import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createCategoryHandler = asyncHandler(async (req, res) => {
    const {name, description, seo_title, is_active} = req.body;
    const category = await createCategory({name, description, seo_title, is_active});
    res.json(new ApiResponse(200, category, "Category created successfully"));
});