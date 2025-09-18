import asyncHandler from '../utils/asyncHandler.js';
import ApiResponse from '../utils/apiResponse.js';
import { createCart } from '../services/cartService.js';


export const createCartHandler = asyncHandler(async (req, res) => {

  const userId = req.user ? req.user.id : null;
  const sessionId = req.guestId || null;
  const createdBy = userId || null;

  const cart = await createCart({ userId, sessionId, createdBy });

  if (!userId) {
    res.cookie('guestId', cart.session_id, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  res.status(200).json(new ApiResponse(201, cart, "Cart created"));
});
