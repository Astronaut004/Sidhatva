import express from 'express';
import cartController from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/').get(cartController.getCart);
router.route('/items').post(cartController.addItemToCart);

export default router;
