// --- File: middleware/validationMiddleware.js ---

import { validationResult } from 'express-validator';

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Return a 400 Bad Request if validation errors exist
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // No errors, proceed
};
