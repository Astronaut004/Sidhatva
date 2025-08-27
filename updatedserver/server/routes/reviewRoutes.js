import express from 'express';
import reviewController from '../controllers/reviewController.js';
import { reviewValidator } from '../validators/reviewValidator.js';
import { protect } from '../middleware/authMiddleware.js';

// We merge params to get productId from the parent router (products)
const router = express.Router({ mergeParams: true });

router.route('/').get(reviewController.getProductReviews);
router.route('/').post(protect, reviewValidator, reviewController.createReview);

export default router;