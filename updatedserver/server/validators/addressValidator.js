import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validationMiddleware.js';

export const addressValidator = [
  body('recipient_name')
    .trim()
    .notEmpty().withMessage('Recipient name is required.'),

  body('address_line_1')
    .trim()
    .notEmpty().withMessage('Address line 1 is required.'),

  body('city')
    .trim()
    .notEmpty().withMessage('City is required.'),

  body('state')
    .trim()
    .notEmpty().withMessage('State is required.'),

  body('postal_code')
    .trim()
    .notEmpty().withMessage('Postal code is required.')
    .isPostalCode('IN').withMessage('Please provide a valid Indian postal code.'),

  body('country')
    .trim()
    .notEmpty().withMessage('Country is required.'),

  handleValidationErrors,
];