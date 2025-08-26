const jwt = require('jsonwebtoken');
const config = require('../config'); // We'll use the centralized config for our secret key

const generateToken = (payload) => {
  // The payload typically contains non-sensitive user info like id and role
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

module.exports = generateToken;
