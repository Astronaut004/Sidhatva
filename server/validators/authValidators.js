// authValidator.js
// This file defines the validation rules for incoming requests
// related to authentication, such as registration and login.

import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';

// Validation rules for the user registration endpoint
export const registerValidator = [
  body('email')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(), // Sanitizes the email (e.g., converts to lowercase)

  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    .matches(/\d/).withMessage('Password must contain a number.')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter.')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter.'),

  body('firstName')
    .trim() // Removes whitespace from the beginning and end
    .notEmpty().withMessage('First name is required.'),

  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required.'),

  // This is our custom middleware that will process the results of these validations.
  handleValidationErrors,
];

// Validation rules for the user login endpoint
export const loginValidator = [
  body('email')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password cannot be empty.'),

  handleValidationErrors,
];
