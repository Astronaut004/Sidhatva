import express from "express";
import {
  getAllSubCategories,
  getSubCategoriesByCategoryId,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryById
} from "../controllers/subCategoryController.js";

const router = express.Router();

router.get("/", getAllSubCategories);
router.get("/category/:categoryId", getSubCategoriesByCategoryId);
router.post("/", createSubCategory);
router.put("/:id", updateSubCategory);
router.delete("/:id", deleteSubCategory);
router.get("/:id", getSubCategoryById);

export default router;
