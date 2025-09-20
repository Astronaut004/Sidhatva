import express from 'express';
import { createCartHandler } from '../controllers/cartController.js';
import { guestOrUser } from '../middleware/guestUserMiddleware.js';

const router = express.Router();


router.post('/', guestOrUser, createCartHandler);

export default router;
