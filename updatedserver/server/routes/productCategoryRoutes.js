import express from "express";
import { createCategoryHandler } from "../controllers/productCategoryController.js";
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
export default router;