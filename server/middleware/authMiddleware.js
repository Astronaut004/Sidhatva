import jwt from 'jsonwebtoken';
import asyncHandler from '../utils/asyncHandler.js';
import { User } from '../models/index.js';
import config from '../config/index.js';

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password_hash'] },
      });
      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});
