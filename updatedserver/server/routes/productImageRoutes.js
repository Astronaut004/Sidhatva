import express from "express";
import { 
  createProductImageHandler,
  getProductImageHandler
} from "../controllers/productImageController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Create an image
router.post("/product-images", protect, authorize("admin", "vendor"), createProductImageHandler);

// Get all images for a product
router.get("/product-images/:product_id", getProductImageHandler);

export default router;
