import express from 'express';
import authRoutes from './authRoutes.js';
import productRoutes from './productRoutes.js';
import cartRoutes from './cartRoutes.js';
import orderRoutes from './orderRoutes.js';
import addressRoutes from './addressRoutes.js';
import wishlistRoutes from './wishlistRoutes.js';
import adminRoutes from './adminRoutes.js';
import productCategoryRoutes from './productCategoryRoutes.js'
import productImageRoutes from './productImageRoutes.js';

const router = express.Router();

// Mount the imported routes onto the main router
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/addresses', addressRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/admin', adminRoutes);
router.use('/category', productCategoryRoutes);
router.use('/upload', productImageRoutes);

export default router;