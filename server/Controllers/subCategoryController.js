import pool from "../models/db.js";
import slugify from "slugify";

// GET /sub-categories
const getAllSubCategories = async (req, res) => {
  try {
    const query = `SELECT sc.*, pc.name AS category_name
                   FROM sub_categories sc
                   JOIN product_categories pc ON sc.category_id = pc.id
                   ORDER BY sc.name ASC`;
    const result = await pool.query(query);

    res.status(200).json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error("Error fetching sub-categories:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// GET /sub-categories/category/:categoryId
const getSubCategoriesByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const query = "SELECT * FROM sub_categories WHERE category_id = $1 ORDER BY name ASC";
    const result = await pool.query(query, [categoryId]);

    res.status(200).json({ success: true, data: result.rows, count: result.rows.length });
  } catch (error) {
    console.error("Error fetching sub-categories:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// POST /sub-categories
const createSubCategory = async (req, res) => {
  try {
    const { name, description, category_id, created_by } = req.body;
    if (!name || !category_id) {
      return res.status(400).json({ success: false, message: "Name and category_id are required" });
    }

    const trimmedName = name.trim();
    const slug = slugify(trimmedName, { lower: true, strict: true });

    const query = `
      INSERT INTO sub_categories (name, slug, description, category_id, created_by) 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const result = await pool.query(query, [trimmedName, slug, description, category_id, created_by || null]);

    res.status(201).json({ success: true, message: "Sub-category created", data: result.rows[0] });
  } catch (error) {
    console.error("Error creating sub-category:", error);
    if (error.code === "23505") {
      return res.status(409).json({ success: false, message: "Sub-category already exists" });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// PUT /sub-categories/:id
const updateSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category_id } = req.body;

    if (!name || !category_id) {
      return res.status(400).json({ success: false, message: "Name and category_id are required" });
    }

    const trimmedName = name.trim();
    const slug = slugify(trimmedName, { lower: true, strict: true });

    const query = `
      UPDATE sub_categories 
      SET name=$1, slug=$2, description=$3, category_id=$4, updated_at=CURRENT_TIMESTAMP
      WHERE id=$5 RETURNING *`;
    const result = await pool.query(query, [trimmedName, slug, description, category_id, id]);

    if (!result.rows.length) {
      return res.status(404).json({ success: false, message: "Sub-category not found" });
    }

    res.status(200).json({ success: true, message: "Sub-category updated", data: result.rows[0] });
  } catch (error) {
    console.error("Error updating sub-category:", error);
    if (error.code === "23505") {
      return res.status(409).json({ success: false, message: "Sub-category already exists" });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// DELETE /sub-categories/:id
const deleteSubCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const checkQuery = "SELECT * FROM sub_categories WHERE id = $1";
    const checkResult = await pool.query(checkQuery, [id]);

    if (!checkResult.rows.length) {
      return res.status(404).json({ success: false, message: "Sub-category not found" });
    }

    await pool.query("DELETE FROM sub_categories WHERE id = $1", [id]);

    res.status(200).json({ success: true, message: "Sub-category deleted", data: checkResult.rows[0] });
  } catch (error) {
    console.error("Error deleting sub-category:", error);
    if (error.code === "23503") {
      return res.status(409).json({ success: false, message: "Sub-category is in use by products" });
    }
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// GET /sub-categories/:id
const getSubCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM sub_categories WHERE id=$1", [id]);

    if (!result.rows.length) {
      return res.status(404).json({ success: false, message: "Sub-category not found" });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error fetching sub-category:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export {
  getAllSubCategories,
  getSubCategoriesByCategoryId,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getSubCategoryById
};
