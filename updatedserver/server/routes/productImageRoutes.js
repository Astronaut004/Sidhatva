import express from "express";
import { createProductImageHandler } from "../controllers/productImageController.js";

const router = express.Router();

router.post("/product-images", createProductImageHandler);

export default router;
