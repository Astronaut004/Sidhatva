import express from "express";
import { createProductHandler } from "../controllers/productController.js";

const router = express.Router();

router.post("/products", createProductHandler);

export default router;
