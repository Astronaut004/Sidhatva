// utils/generateToken.js

const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
  return jwt.sign(
    payload, 
    process.env.JWT_SECRET,
    {
      expiresIn: '7d', // Token expires in 7 days
    }
  );
};

module.exports = generateToken;
