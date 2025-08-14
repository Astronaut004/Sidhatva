// routes/orderRoutes.js
import express from 'express';
import * as orderController from '../controllers/orderController.js';

const router = express.Router();

// Create a new order
router.post('/', orderController.createOrder);

// Get orders (optionally filtered by query params)
router.get('/', orderController.getOrders);

// Get a single order by ID
router.get('/:id', orderController.getOrderById);

// Update an order (status, payment, delivery, etc.)
router.put('/:id', orderController.updateOrder);

// Cancel an order (soft delete)
router.delete('/:id', orderController.cancelOrder);

export default router;
