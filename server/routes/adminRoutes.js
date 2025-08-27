import express from 'express';
import adminController from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Protect all routes in this file and ensure only admins can access them
router.use(protect);
router.use(authorize('admin'));

router.route('/users').get(adminController.getAllUsers);
router.route('/users/:id').put(adminController.updateUser);

export default router;
