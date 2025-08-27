import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';

export const reviewValidator = [
  body('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5.'),

  body('comment')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Comment cannot exceed 1000 characters.'),

  handleValidationErrors,
];
