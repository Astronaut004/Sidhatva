import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';

export const registerValidator = [
  body('email')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    .matches(/\d/).withMessage('Password must contain a number.')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter.')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter.'),

  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required.'),

  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required.'),

  handleValidationErrors,
];

export const loginValidator = [
  body('email')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password cannot be empty.'),

  handleValidationErrors,
];