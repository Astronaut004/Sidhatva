import pool from "../models/db";


//Entire product controllers


//create a product
export const createProduct = async (req,res) => {
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
        category_id
    } = req.body;
    try {
        const result = await pool.query(
            `INSERT INTO products (
                id, image, heading, tag, rating, review_count, price, ac_price, 
                description, img_head, img_attribute, type, category_id
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, 
                $9, $10, $11, $12, $13
            ) RETURNING *`,
            [
                id,
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
                category_id
            ]
        );
        res.status(201).json({ message: "Product created", product: result.rows[0] });
    }
    catch (err) {
        // console.error("Error creating product:", err.message);
        res.status(500).json({ error: "Failed to create product" });
  }
};

//get all products

export const getAllByType = async (req, res) => {
  const { type } = req.params; // Expect 'F', 'E', 'D', etc.
  try {
    const result = await pool.query('SELECT * FROM products WHERE type = $1', [type]);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch products by type' });
  }
};


//get only one product

export const getProductById = async (req, res) => {
  const { id, type } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1 AND type = $2',
      [id, type]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("❌ Error fetching product by ID:", error.message);
    res.status(500).json({ error: 'Failed to fetch your requested product' });
  }
};



export const UpdateProductById = async (req, res) => {
  const { id } = req.params;
  const {
    image_filename,
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
    category_id
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE products SET 
        image_filename = $1,
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
        category_id = $12
      WHERE id = $13
      RETURNING *`,
      [
        image_filename,
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
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product updated", product: result.rows[0] });
  } catch (err) {
    console.error("❌ Failed to update product:", err.message);
    res.status(500).json({ error: "Failed to update product" });
  }
};



export const deleteJob = async (req, res) => {

}