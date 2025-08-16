import pool from "../models/db.js";

/**
 * Product Category Controller
 * Handles CRUD operations for product categories
 */

// GET /categories - List all categories
const getAllCategories = async (req, res) => {
  try {
    const query = 'SELECT * FROM product_categories ORDER BY name ASC';
    const result = await pool.query(query);
    
    res.status(200).json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// POST /categories - Create a new category (admin)
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required and must be a non-empty string'
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Category name must be 100 characters or less'
      });
    }
    const trimmedName = name.trim();
    // Insert new category
    const query = 'INSERT INTO product_categories (name) VALUES ($1) RETURNING id, name';
    const result = await pool.query(query, [trimmedName]);

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating category:', error);
    
    // Handle unique constraint violation
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'Category name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// PUT /categories/:id - Update category (admin)
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: 'Valid category ID is required'
      });
    }

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required and must be a non-empty string'
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Category name must be 100 characters or less'
      });
    }

    const trimmedName = name.trim();

    // Update category
    const query = 'UPDATE product_categories SET name = $1 WHERE id = $2 RETURNING id, name';
    const result = await pool.query(query, [trimmedName, parseInt(id)]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating category:', error);
    
    // Handle unique constraint violation
    if (error.code === '23505') {
      return res.status(409).json({
        success: false,
        message: 'Category name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// DELETE /categories/:id - Delete category (admin)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: 'Valid category ID is required'
      });
    }

    // Check if category exists and get its data before deletion
    const checkQuery = 'SELECT id, name FROM product_categories WHERE id = $1';
    const checkResult = await pool.query(checkQuery, [parseInt(id)]);

    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    // Delete category
    const deleteQuery = 'DELETE FROM product_categories WHERE id = $1';
    await pool.query(deleteQuery, [parseInt(id)]);

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
      data: checkResult.rows[0]
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    
    // Handle foreign key constraint violation
    if (error.code === '23503') {
      return res.status(409).json({
        success: false,
        message: 'Cannot delete category as it is being used by products'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// GET /categories/:id - Get single category (optional utility method)
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({
        success: false,
        message: 'Valid category ID is required'
      });
    }

    const query = 'SELECT id, name FROM product_categories WHERE id = $1';
    const result = await pool.query(query, [parseInt(id)]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById
};
