// cartController.js
import jwt from "jsonwebtoken";
import pool from "../models/db.js";

// ===== Middleware =====
export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    req.user = decoded; // decoded payload: { id, email }
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

// ===== Controllers =====

// Add item to cart
export const addCartItem = async (req, res) => {
  const user_id = req.user.id; // from middleware
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity) {
    return res.status(400).json({ success: false, message: "product_id and quantity are required" });
  }

  try {
    const existing = await pool.query(
      "SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2",
      [user_id, product_id]
    );

    let result;
    if (existing.rows.length > 0) {
      result = await pool.query(
        "UPDATE cart_items SET quantity = quantity + $1 WHERE user_id = $2 AND product_id = $3 RETURNING *",
        [quantity, user_id, product_id]
      );
    } else {
      result = await pool.query(
        "INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *",
        [user_id, product_id, quantity]
      );
    }

    res.status(201).json({ success: true, cartItem: result.rows[0] });
  } catch (err) {
    console.error("Add cart error:", err);
    res.status(500).json({ success: false, message: "Error adding cart item" });
  }
};

// Get all items for logged-in user
export const getCartItems = async (req, res) => {
  const user_id = req.user.id;
  try {
    const result = await pool.query(
      `SELECT ci.id, ci.product_id, p.heading, ci.quantity, p.price, (ci.quantity * p.price) as item_total
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.user_id = $1`,
      [user_id]
    );
    res.json({ success: true, items: result.rows });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ success: false, message: "Error fetching cart items" });
  }
};

// Update item
export const updateCartItem = async (req, res) => {
  const user_id = req.user.id;
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ success: false, message: "Quantity must be greater than 0" });
  }

  try {
    const existing = await pool.query(
      "SELECT * FROM cart_items WHERE id = $1 AND user_id = $2",
      [id, user_id]
    );
    if (existing.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    const result = await pool.query(
      "UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *",
      [quantity, id]
    );

    res.json({ success: true, cartItem: result.rows[0] });
  } catch (err) {
    console.error("Update cart error:", err);
    res.status(500).json({ success: false, message: "Error updating cart item" });
  }
};

// Remove item
export const removeCartItem = async (req, res) => {
  const user_id = req.user.id;
  const { id } = req.params;
  try {
    const existing = await pool.query(
      "SELECT * FROM cart_items WHERE id = $1 AND user_id = $2",
      [id, user_id]
    );
    if (existing.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    const result = await pool.query("DELETE FROM cart_items WHERE id = $1 RETURNING *", [id]);
    res.json({ success: true, message: "Cart item removed", cartItem: result.rows[0] });
  } catch (err) {
    console.error("Remove cart error:", err);
    res.status(500).json({ success: false, message: "Error removing cart item" });
  }
};

// Clear cart
export const clearCart = async (req, res) => {
  const user_id = req.user.id;
  try {
    await pool.query("DELETE FROM cart_items WHERE user_id = $1", [user_id]);
    res.json({ success: true, message: "Cart cleared" });
  } catch (err) {
    console.error("Clear cart error:", err);
    res.status(500).json({ success: false, message: "Error clearing cart" });
  }
};
