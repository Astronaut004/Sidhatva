import express from "express";
import { createProductHandler, getAllActiveProductsHandler, getAllProductsHandler, getProductsByCategoryHandler, getProductBySlugHandler, updateProductHandler, deleteProductHandler } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { createProductValidator } from "../validators/productValidators.js";
import { handleValidationErrors } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  createProductValidator,
  handleValidationErrors,
  protect,
  authorize("admin", "vendor"),
  createProductHandler
);

router.get(
  "/",
  getAllActiveProductsHandler
);

router.get(
  "/all",
  protect,
  authorize("admin", "vendor"),
  getAllProductsHandler
);

router.get(
  "/category/:categoryId",
  getProductsByCategoryHandler
);

router.get(
  "/:slug",
  getProductBySlugHandler
);


router.put(
  "/:id",
  protect,
  authorize("admin", "vendor"),
  updateProductHandler
);

router.delete(
  "/:id",
  protect,
  authorize("admin", "vendor"),
  deleteProductHandler
);

export default router;
