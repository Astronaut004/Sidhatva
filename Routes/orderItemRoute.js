import express from 'express';
import * as orderItemController from '../controllers/orderItemController.js';

const router = express.Router();


router.post('/', orderItemController.addOrderItem);
router.get('/order/:orderId', orderItemController.getOrderItems);
router.get('/:id', orderItemController.getOrderItemById);
router.put('/:id', orderItemController.updateOrderItem);
router.delete('/:id', orderItemController.removeOrderItem);

export default router;
