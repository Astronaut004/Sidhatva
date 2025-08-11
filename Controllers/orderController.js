// controllers/orderController.js
import pool from "../models/db.js";

// Create a new order
exports.createOrder = async (req, res) => {
  // Destructure required fields from request body
  const { user_id, total_amount, payment_method, delivery_address } = req.body;

  // Validate required fields
  if (!user_id || !total_amount) {
    return res.status(400).json({ 
      success: false, 
      message: 'user_id and total_amount are required' 
    });
  }

  try {
    // Insert new order into database
    const result = await pool.query(
      `INSERT INTO orders (
        user_id, 
        total_amount, 
        payment_method, 
        delivery_address
      ) VALUES ($1, $2, $3, $4) 
      RETURNING *`,
      [user_id, total_amount, payment_method, delivery_address]
    );

    // Return 201 Created with new order data
    res.status(201).json({ 
      success: true, 
      order: result.rows[0] 
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error creating order',
      error: error.message // Send actual error message for debugging
    });
  }
};

// Get orders with filters
exports.getOrders = async (req, res) => {
  // Extract possible query parameters
  const { user_id, status, payment_status } = req.query;
  const queryParams = [];
  let query = `SELECT * FROM orders WHERE 1 = 1`;
  
  try {
    // Build dynamic query based on provided filters
    if (user_id) {
      query += ` AND user_id = $${queryParams.length + 1}`;
      queryParams.push(user_id);
    }
    
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
    
    res.json({ 
      success: true, 
      count: result.rowCount,
      orders: result.rows 
    });
  } catch (error) {
    console.error('Order fetch error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching orders',
      error: error.message
    });
  }
};

// Get single order by ID
exports.getOrderById = async (req, res) => {
  const orderId = parseInt(req.params.id);

  try {
    const result = await pool.query(
      `SELECT * FROM orders WHERE id = $1`, 
      [orderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: `Order with ID ${orderId} not found` 
      });
    }

    res.json({ 
      success: true, 
      order: result.rows[0] 
    });
  } catch (error) {
    console.error(`Order fetch error (ID: ${orderId}):`, error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching order',
      error: error.message
    });
  }
};

// Update order details
exports.updateOrder = async (req, res) => {
  const orderId = parseInt(req.params.id);
  const { 
    status, 
    payment_status, 
    payment_method,
    delivery_address
  } = req.body;

  // Validate at least one field is provided
  if (!status && !payment_status && !payment_method && !delivery_address) {
    return res.status(400).json({ 
      success: false, 
      message: 'Provide at least one field to update (status, payment_status, payment_method, delivery_address)' 
    });
  }

  try {
    // Build dynamic update query
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
    
    values.push(orderId);
    
    const query = `
      UPDATE orders
      SET ${updates.join(', ')}
      WHERE id = $${values.length}
      RETURNING *
    `;
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: `Order with ID ${orderId} not found` 
      });
    }

    res.json({ 
      success: true, 
      message: 'Order updated successfully',
      order: result.rows[0]
    });
  } catch (error) {
    console.error(`Order update error (ID: ${orderId}):`, error);
    res.status(500).json({ 
      success: false, 
      message: 'Error updating order',
      error: error.message
    });
  }
};

// Cancel/delete order
exports.cancelOrder = async (req, res) => {
  const orderId = parseInt(req.params.id);

  try {
    // First check if order exists
    const checkOrder = await pool.query(
      `SELECT id FROM orders WHERE id = $1`,
      [orderId]
    );

    if (checkOrder.rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: `Order with ID ${orderId} not found` 
      });
    }

    // Soft delete (update status) instead of physical delete
    const result = await pool.query(
      `UPDATE orders 
       SET status = 'Cancelled'
       WHERE id = $1
       RETURNING *`,
      [orderId]
    );

    res.json({ 
      success: true, 
      message: 'Order cancelled successfully',
      order: result.rows[0]
    });
  } catch (error) {
    console.error(`Order cancellation error (ID: ${orderId}):`, error);
    res.status(500).json({ 
      success: false, 
      message: 'Error cancelling order',
      error: error.message
    });
  }
};