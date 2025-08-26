// productValidator.js
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';

export const createProductValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('Product name is required.')
    .isLength({ min: 3 }).withMessage('Product name must be at least 3 characters long.'),

  body('sku')
    .trim()
    .notEmpty().withMessage('SKU is required.'),

  body('selling_price')
    .notEmpty().withMessage('Selling price is required.')
    .isDecimal({ decimal_digits: '0,2' }).withMessage('Selling price must be a valid decimal number.')
    .toFloat(),

  body('category_id')
    .notEmpty().withMessage('Category ID is required.')
    .isInt({ gt: 0 }).withMessage('A valid category ID is required.'),

  body('brand_id')
    .notEmpty().withMessage('Brand ID is required.')
    .isInt({ gt: 0 }).withMessage('A valid brand ID is required.'),

  // This middleware will process any validation errors.
  handleValidationErrors,
];
