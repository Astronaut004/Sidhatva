import express from 'express';
import addressController from '../controllers/addressController.js';
import { addressValidator } from '../validators/addressValidator.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/').post(addressValidator, addressController.createAddress).get(addressController.getUserAddresses);

export default router;
