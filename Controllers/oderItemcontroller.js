// controllers/orderItemController.js
const pool = require('../config/db');

// Add item to an order
exports.addOrderItem = async (req, res) => {
  const { order_id, product_id, quantity, price } = req.body;
  
  // Validate required fields
  if (!order_id || !product_id || !quantity || !price) {
    return res.status(400).json({
      success: false,
      message: 'All fields (order_id, product_id, quantity, price) are required'
    });
  }

  // Validate quantity
  if (quantity <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Quantity must be greater than 0'
    });
  }

  try {
    // Check if order exists
    const orderCheck = await pool.query(
      'SELECT id FROM orders WHERE id = $1',
      [order_id]
    );
    
    if (orderCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Order with ID ${order_id} not found`
      });
    }

    // Check if product exists
    const productCheck = await pool.query(
      'SELECT id FROM products WHERE id = $1',
      [product_id]
    );
    
    if (productCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Product with ID ${product_id} not found`
      });
    }

    // Insert order item
    const result = await pool.query(
      `INSERT INTO order_items (
        order_id, 
        product_id, 
        quantity, 
        price
      ) VALUES ($1, $2, $3, $4) 
      RETURNING *`,
      [order_id, product_id, quantity, price]
    );

    res.status(201).json({
      success: true,
      orderItem: result.rows[0]
    });
  } catch (error) {
    console.error('Add order item error:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding order item',
      error: error.message
    });
  }
};

// Get items for an order
exports.getOrderItems = async (req, res) => {
  const orderId = parseInt(req.params.orderId);

  try {
    // Check if order exists
    const orderCheck = await pool.query(
      'SELECT id FROM orders WHERE id = $1',
      [orderId]
    );
    
    if (orderCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Order with ID ${orderId} not found`
      });
    }

    // Get all items for order
    const result = await pool.query(
      `SELECT 
        oi.id, 
        oi.product_id, 
        p.name AS product_name,
        oi.quantity,
        oi.price,
        (oi.quantity * oi.price) AS item_total
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = $1`,
      [orderId]
    );

    res.json({
      success: true,
      count: result.rowCount,
      orderItems: result.rows
    });
  } catch (error) {
    console.error(`Get order items error (Order ID: ${orderId}):`, error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order items',
      error: error.message
    });
  }
};

// Update order item quantity
exports.updateOrderItem = async (req, res) => {
  const itemId = parseInt(req.params.id);
  const { quantity } = req.body;

  // Validate input
  if (!quantity) {
    return res.status(400).json({
      success: false,
      message: 'Quantity is required'
    });
  }

  if (quantity <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Quantity must be greater than 0'
    });
  }

  try {
    // Check if item exists
    const itemCheck = await pool.query(
      `SELECT 
        oi.id, 
        o.status AS order_status
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE oi.id = $1`,
      [itemId]
    );
    
    if (itemCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Order item with ID ${itemId} not found`
      });
    }

    // Prevent modification of completed/cancelled orders
    const orderStatus = itemCheck.rows[0].order_status;
    if (['Shipped', 'Delivered', 'Cancelled'].includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Cannot modify items in ${orderStatus} orders`
      });
    }

    // Update quantity (price is snapshot so not updated)
    const result = await pool.query(
      `UPDATE order_items 
       SET quantity = $1 
       WHERE id = $2
       RETURNING *`,
      [quantity, itemId]
    );

    res.json({
      success: true,
      message: 'Order item updated successfully',
      orderItem: result.rows[0]
    });
  } catch (error) {
    console.error(`Update order item error (ID: ${itemId}):`, error);
    res.status(500).json({
      success: false,
      message: 'Error updating order item',
      error: error.message
    });
  }
};

// Remove item from order
exports.removeOrderItem = async (req, res) => {
  const itemId = parseInt(req.params.id);

  try {
    // Check if item exists
    const itemCheck = await pool.query(
      `SELECT 
        oi.id, 
        o.status AS order_status
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE oi.id = $1`,
      [itemId]
    );
    
    if (itemCheck.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Order item with ID ${itemId} not found`
      });
    }

    // Prevent removal from completed/cancelled orders
    const orderStatus = itemCheck.rows[0].order_status;
    if (['Shipped', 'Delivered', 'Cancelled'].includes(orderStatus)) {
      return res.status(400).json({
        success: false,
        message: `Cannot remove items from ${orderStatus} orders`
      });
    }

    // Delete item
    const result = await pool.query(
      `DELETE FROM order_items 
       WHERE id = $1 
       RETURNING *`,
      [itemId]
    );

    res.json({
      success: true,
      message: 'Order item removed successfully',
      orderItem: result.rows[0]
    });
  } catch (error) {
    console.error(`Remove order item error (ID: ${itemId}):`, error);
    res.status(500).json({
      success: false,
      message: 'Error removing order item',
      error: error.message
    });
  }
};

// Get order item by ID
exports.getOrderItemById = async (req, res) => {
  const itemId = parseInt(req.params.id);

  try {
    const result = await pool.query(
      `SELECT 
        oi.id,
        oi.order_id,
        oi.product_id,
        p.name AS product_name,
        oi.quantity,
        oi.price,
        (oi.quantity * oi.price) AS item_total
      FROM order_items oi
      JOIN products p ON oi.product_id = p.id
      WHERE oi.id = $1`,
      [itemId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Order item with ID ${itemId} not found`
      });
    }

    res.json({
      success: true,
      orderItem: result.rows[0]
    });
  } catch (error) {
    console.error(`Get order item error (ID: ${itemId}):`, error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order item',
      error: error.message
    });
  }
};