import express from "express";
import { createCategoryHandler, getAllActiveCategoriesHandler, getAllCategoriesHandler, getCategoryBySlugHandler, updateCategoryHandler, deleteCategoryHandler, getCategoryByIdHandler } from "../controllers/productCategoryController.js";
import { createCategoryValidator } from "../validators/categoryValidator.js";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// router.post('/create-category', createCategoryHandler);
router.post(
    '/create-category',
    createCategoryValidator,
    handleValidationErrors,
    protect,
    authorize('admin'),
    createCategoryHandler
);
router.get(
  "/active", 
  protect,
  authorize("admin", "vendor"),
  getAllActiveCategoriesHandler);

// ✅ Get all categories (admin or staff, includes inactive)
router.get(
  "/all",
  protect,
  authorize("admin", "vendor"),
  getAllCategoriesHandler
);

// ✅ Get category by slug (public)
router.get("/slug/:slug", getCategoryBySlugHandler);

// ✅ Get category by ID (admin or staff)
router.get(
  "/:id",
  protect,
  authorize("admin", "vendor"),
  getCategoryByIdHandler
);

// ✅ Update category (Admin only)
router.put(
  "/:id",
  handleValidationErrors,
  protect,
  authorize("admin"),
  updateCategoryHandler
);

// ✅ Delete category (Admin only)
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteCategoryHandler
);



export default router;