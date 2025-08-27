import express from 'express';
import orderController from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/').post(orderController.createOrder).get(orderController.getUserOrders);

export default router;
