import pool from "../models/db.js";

// CREATE a product
export const createProduct = async (req, res) => {
  const {
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
  } = req.body;

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

    res.status(201).json({ message: "✅ Product created", product: result.rows[0] });
  } catch (err) {
    console.error("❌ Error creating product:", err.message);
    res.status(500).json({ error: "Failed to create product" });
  }
};

// GET all products by type
export const getAllByType = async (req, res) => {
  const { type } = req.query;
  try {
    const query = type
      ? 'SELECT * FROM products WHERE type = $1'
      : 'SELECT * FROM products';

    const values = type ? [type] : [];

    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("❌ Error fetching products:", err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// GET one product by ID and type
export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};


// UPDATE product by ID
export const updateProductById = async (req, res) => {
  const { id } = req.params;
  const {
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
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE products SET 
        image = $1,
        heading = $2,
        tag = $3,
        rating = $4,
        review_count = $5,
        price = $6,
        ac_price = $7,
        description = $8,
        img_head = $9,
        img_attribute = $10,
        type = $11,
        category_id = $12,
        created_by = $13
      WHERE id = $14
      RETURNING *`,
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
        created_by,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "✅ Product updated", product: result.rows[0] });
  } catch (err) {
    console.error("❌ Failed to update product:", err.message);
    res.status(500).json({ error: "Failed to update product" });
  }
};

// DELETE product by ID
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "✅ Product deleted", product: result.rows[0] });
  } catch (err) {
    console.error("❌ Failed to delete product:", err.message);
    res.status(500).json({ error: "Failed to delete product" });
  }
};
