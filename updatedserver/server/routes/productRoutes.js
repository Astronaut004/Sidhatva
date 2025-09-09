import express from "express";
import { createProductHandler } from "../controllers/productController.js";
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

export default router;
