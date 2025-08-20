import express from "express";
import { getAllCategories, createCategory , updateCategory, deleteCategory, getCategoryById } from "../Controllers/productCategoryController.js";


const router = express.Router();


router.route('/')
    .get(getAllCategories)
    .post(createCategory)

router.route('/:id')
    .get(getCategoryById)
    .put(updateCategory)
    .delete(deleteCategory)


export default router;