// orderController.js
import jwt from "jsonwebtoken";
import pool from "../models/db.js";

// ===================== AUTH MIDDLEWARE =====================
export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    req.user = decoded; // attach user data to request
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};

// ===================== ORDER CONTROLLER =====================
export const createOrder = async (req, res) => {
  const { total_amount, payment_method, delivery_address } = req.body;
  const user_id = req.user.id; // user_id from token

  if (!user_id || !total_amount) {
    return res.status(400).json({ success: false, message: "user_id and total_amount are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO orders (
        user_id, total_amount, payment_method, delivery_address
      ) VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, total_amount, payment_method, delivery_address]
    );
    res.status(201).json({ success: true, order: result.rows[0] });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ success: false, message: "Error creating order", error: error.message });
  }
};

export const getOrders = async (req, res) => {
  const { status, payment_status } = req.query;
  const queryParams = [req.user.id]; // filter by logged-in user
  let query = `SELECT * FROM orders WHERE user_id = $1`;

  try {
    if (status) {
      query += ` AND status = $${queryParams.length + 1}`;
      queryParams.push(status);
    }

    if (payment_status) {
      query += ` AND payment_status = $${queryParams.length + 1}`;
      queryParams.push(payment_status);
    }

    query += ` ORDER BY created_at DESC`;

    const result = await pool.query(query, queryParams);

    res.json({ success: true, count: result.rowCount, orders: result.rows });
  } catch (error) {
    console.error("Order fetch error:", error);
    res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  const orderId = parseInt(req.params.id);

  try {
    const result = await pool.query(
      `SELECT * FROM orders WHERE id = $1 AND user_id = $2`,
      [orderId, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: `Order not found` });
    }

    res.json({ success: true, order: result.rows[0] });
  } catch (error) {
    console.error(`Order fetch error (ID: ${orderId}):`, error);
    res.status(500).json({ success: false, message: "Error fetching order", error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  const orderId = parseInt(req.params.id);
  const { status, payment_status, payment_method, delivery_address } = req.body;

  if (!status && !payment_status && !payment_method && !delivery_address) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one field to update",
    });
  }

  try {
    const updates = [];
    const values = [];
    
    if (status) {
      updates.push(`status = $${values.length + 1}`);
      values.push(status);
    }
    if (payment_status) {
      updates.push(`payment_status = $${values.length + 1}`);
      values.push(payment_status);
    }
    if (payment_method) {
      updates.push(`payment_method = $${values.length + 1}`);
      values.push(payment_method);
    }
    if (delivery_address) {
      updates.push(`delivery_address = $${values.length + 1}`);
      values.push(delivery_address);
    }

    values.push(orderId, req.user.id);

    const query = `
      UPDATE orders
      SET ${updates.join(", ")}
      WHERE id = $${values.length - 1} AND user_id = $${values.length}
      RETURNING *
    `;

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: `Order not found or unauthorized` });
    }

    res.json({ success: true, message: "Order updated successfully", order: result.rows[0] });
  } catch (error) {
    console.error(`Order update error (ID: ${orderId}):`, error);
    res.status(500).json({ success: false, message: "Error updating order", error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  const orderId = parseInt(req.params.id);

  try {
    const result = await pool.query(
      `UPDATE orders 
       SET status = 'Cancelled'
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [orderId, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: `Order not found or unauthorized` });
    }

    res.json({ success: true, message: "Order cancelled successfully", order: result.rows[0] });
  } catch (error) {
    console.error(`Order cancellation error (ID: ${orderId}):`, error);
    res.status(500).json({ success: false, message: "Error cancelling order", error: error.message });
  }
};
