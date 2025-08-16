// routes/orderRoutes.js
import express from 'express';
import * as orderController from '../Controllers/orderController.js';

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.cancelOrder);

export default router;
