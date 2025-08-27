import express from 'express';
import authController from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../validators/authValidators.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerValidator, authController.registerUser);
router.post('/login', loginValidator, authController.loginUser);
router.get('/me', protect, authController.getCurrentUser);

export default router;
