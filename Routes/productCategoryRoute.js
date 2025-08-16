import express from "express";
import { getAllCategories, createCategory , updateCategory, deleteCategory, getCategoryById } from "../Controllers/productCategoryController";


const router = express.Router();


router.route('/category')
    .get(getAllCategories)
    .post(createCategory)

router.route('/category/:id')
    .get(getCategoryById)
    .put(updateCategory)
    .delete(deleteCategory)