import { body } from 'express-validator';

export const createCategoryValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 255 })
    .withMessage('Name cannot exceed 255 characters'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('seo_title')
    .optional()
    .isString()
    .withMessage('SEO title must be a string'),
  body('is_active')
    .optional()
    .isBoolean()
    .withMessage('is_active must be a boolean'),
];
