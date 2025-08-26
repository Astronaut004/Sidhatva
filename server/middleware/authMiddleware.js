const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const { User } = require('../models');
const config = require('../config');

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for the token in the 'Authorization' header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, config.jwt.secret);

      // Find the user from the token's payload and attach it to the request object
      // We exclude the password for security
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password_hash'] }
      });

      if (!req.user) {
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next(); // If everything is good, proceed to the protected route
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

module.exports = { protect };
