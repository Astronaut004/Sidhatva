const { validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, return a 400 Bad Request response
    return res.status(400).json({ errors: errors.array() });
  }
  next(); // No errors, proceed to the next middleware or controller
};

module.exports = { handleValidationErrors };