import express from 'express';
import productController from '../controllers/productController.js';
import { createProductValidator } from '../validators/productValidators.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import reviewRouter from './reviewRoutes.js';

const router = express.Router();

// Re-route any request going to '/:productId/reviews' to the review router
router.use('/:productId/reviews', reviewRouter);

router.get('/', productController.getAllProducts);
router.get('/:slug', productController.getProductBySlug);
router.post('/', protect, authorize('admin', 'vendor'), createProductValidator, productController.createProduct);

export default router;