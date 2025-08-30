import { body } from 'express-validator';

export const registerValidator = [
  body('email').optional().isEmail().withMessage('Invalid email'),
  body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
];

export const loginValidator = [
  body('email').optional().isEmail(),
  body('password').isLength({ min: 6 }),
  body('password').optional().isLength( {min: 6}),
];