const { body } = require('express-validator');
const { handleValidationErrors } = require('../middleware/validationMiddleware');

exports.addressValidator = [
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

  // This middleware will process any validation errors.
  handleValidationErrors,
];
