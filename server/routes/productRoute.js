import express from "express";
import { createProduct, getAllByType, getProductById, updateProductById, deleteProduct } from '../Controllers/productController.js';
import { adminAuth } from "../middlewares/productMiddleware.js";

const router = express.Router();

// Get all by type → /api/products?type=chair
router.route('/')
  .get(getAllByType)     // GET /api/products?type=chair
  .post(adminAuth, createProduct);  // POST /api/products

// CRUD by ID
router.route('/:id')
  .get(getProductById)       // GET /api/products/:id
  .patch(adminAuth, updateProductById)  // PATCH /api/products/:id
  .delete(adminAuth, deleteProduct);    // DELETE /api/products/:id

export default router;
