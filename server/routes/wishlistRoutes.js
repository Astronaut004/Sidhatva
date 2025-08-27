import express from 'express';
import wishlistController from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/').get(wishlistController.getWishlist);
router.route('/items').post(wishlistController.addItem);
router.route('/items/:itemId').delete(wishlistController.removeItem);

export default router;
