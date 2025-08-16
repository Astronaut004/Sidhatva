import pool from "../models/db.js";

// Input validation helper
const validateProductData = (data, isUpdate = false) => {
  const errors = [];
  
  // Required fields for creation
  if (!isUpdate) {
    if (!data.heading) errors.push("Heading is required");
    if (!data.price) errors.push("Price is required");
    if (!data.type) errors.push("Type is required");
    if (!data.category_id) errors.push("Category ID is required");
  }
  
  // Validate data types
  if (data.rating && (data.rating < 0 || data.rating > 5)) {
    errors.push("Rating must be between 0 and 5");
  }
  if (data.price && data.price < 0) {
    errors.push("Price must be positive");
  }
  if (data.ac_price && data.ac_price < 0) {
    errors.push("Actual price must be positive");
  }
  if (data.review_count && data.review_count < 0) {
    errors.push("Review count must be non-negative");
  }
  
  return errors;
};

// CREATE a product
export const createProduct = async (req, res) => {
  const {
    image,
    heading,
    tag,
    rating = 0,
    review_count = 0,
    price,
    ac_price,
    description,
    img_head,
    img_attribute,
    type,
    category_id,
    created_by
  } = req.body;

  // Validate input
  const validationErrors = validateProductData(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({ 
      error: "Validation failed", 
      details: validationErrors 
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO products (
        image, heading, tag, rating, review_count, price, ac_price, 
        description, img_head, img_attribute, type, category_id, created_by
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13
      ) RETURNING *`,
      [
        image,
        heading,
        tag,
        rating,
        review_count,
        price,
        ac_price,
        description,
        img_head,
        img_attribute,
        type,
        category_id,
        created_by
      ]
    );

    res.status(201).json({ 
      success: true,
      message: "✅ Product created successfully", 
      data: result.rows[0] 
    });
  } catch (err) {
    console.error("❌ Error creating product:", err.message);
    res.status(500).json({ 
      success: false,
      error: "Failed to create product",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// GET all products by type with pagination and search
export const getAllByType = async (req, res) => {
  const { 
    type, 
    page = 1, 
    limit = 10, 
    search,
    sort_by = 'id',
    sort_order = 'DESC'
  } = req.query;
  
  try {
    // Validate pagination parameters
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit))); // Max 100 items per page
    const offset = (pageNum - 1) * limitNum;

    // Build query conditions
    const conditions = [];
    const values = [];
    let paramCount = 1;

    if (type) {
      conditions.push(`type = $${paramCount}`);
      values.push(type);
      paramCount++;
    }

    if (search) {
      conditions.push(`(heading ILIKE $${paramCount} OR description ILIKE $${paramCount})`);
      values.push(`%${search}%`);
      paramCount++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const orderClause = `ORDER BY ${sort_by} ${sort_order.toUpperCase()}`;

    // Get total count
    const countQuery = `SELECT COUNT(*) FROM products ${whereClause}`;
    const countResult = await pool.query(countQuery, values);
    const totalItems = parseInt(countResult.rows[0].count);

    // Get paginated results
    const dataQuery = `SELECT * FROM products ${whereClause} ${orderClause} LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    const dataResult = await pool.query(dataQuery, [...values, limitNum, offset]);

    res.status(200).json({
      success: true,
      data: dataResult.rows,
      pagination: {
        current_page: pageNum,
        per_page: limitNum,
        total_items: totalItems,
        total_pages: Math.ceil(totalItems / limitNum),
        has_next: pageNum < Math.ceil(totalItems / limitNum),
        has_prev: pageNum > 1
      }
    });
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch products',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// GET one product by ID
export const getProductById = async (req, res) => {
  const { id } = req.params;
  
  // Validate ID format
  if (!id || isNaN(id)) {
    return res.status(400).json({ 
      success: false,
      error: 'Invalid product ID' 
    });
  }

  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: 'Product not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error.message);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch product',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// UPDATE product by ID (supports partial updates)
export const updateProductById = async (req, res) => {
  const { id } = req.params;
  
  // Validate ID format
  if (!id || isNaN(id)) {
    return res.status(400).json({ 
      success: false,
      error: 'Invalid product ID' 
    });
  }

  // Validate input data
  const validationErrors = validateProductData(req.body, true);
  if (validationErrors.length > 0) {
    return res.status(400).json({ 
      success: false,
      error: "Validation failed", 
      details: validationErrors 
    });
  }

  try {
    // Check if product exists
    const existingProduct = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (existingProduct.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: "Product not found" 
      });
    }

    // Build dynamic update query for partial updates
    const allowedFields = [
      'image', 'heading', 'tag', 'rating', 'review_count', 'price', 
      'ac_price', 'description', 'img_head', 'img_attribute', 'type', 
      'category_id', 'created_by'
    ];
    
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    // Only update fields that are provided in request body
    Object.entries(req.body).forEach(([key, value]) => {
      if (allowedFields.includes(key) && value !== undefined) {
        updateFields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (updateFields.length === 0) {
      return res.status(400).json({ 
        success: false,
        error: 'No valid fields to update' 
      });
    }

    // Add updated_at timestamp
    // updateFields.push(`updated_at = NOW()`);
    values.push(id); // Add ID as last parameter

    const query = `
      UPDATE products 
      SET ${updateFields.join(', ')} 
      WHERE id = $${paramCount} 
      RETURNING *
    `;

    const result = await pool.query(query, values);

    res.status(200).json({ 
      success: true,
      message: "✅ Product updated successfully", 
      data: result.rows[0] 
    });
  } catch (err) {
    console.error("❌ Failed to update product:", err.message);
    res.status(500).json({ 
      success: false,
      error: "Failed to update product",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

// DELETE product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  
  // Validate ID format
  if (!id || isNaN(id)) {
    return res.status(400).json({ 
      success: false,
      error: 'Invalid product ID' 
    });
  }

  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        error: "Product not found" 
      });
    }

    res.status(200).json({ 
      success: true,
      message: "✅ Product deleted successfully", 
      data: result.rows[0] 
    });
  } catch (err) {
    console.error("❌ Failed to delete product:", err.message);
    res.status(500).json({ 
      success: false,
      error: "Failed to delete product",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};