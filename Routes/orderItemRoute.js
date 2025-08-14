// routes/orderItemRoutes.js
import express from 'express';
import * as orderItemController from '../controllers/orderItemController.js';

const router = express.Router();

// Add an item to an order
router.post('/', orderItemController.addOrderItem);

// Get all items for a specific order
router.get('/order/:orderId', orderItemController.getOrderItems);

// Get a single order item by ID
router.get('/:id', orderItemController.getOrderItemById);

// Update an order item quantity
router.put('/:id', orderItemController.updateOrderItem);

// Remove an item from an order
router.delete('/:id', orderItemController.removeOrderItem);

export default router;
