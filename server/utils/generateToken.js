// utils/generateToken.js

// const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';

export const generateToken = async (payload) => {
  return jwt.sign(
    payload, 
    process.env.JWT_SECRET,
    {
      expiresIn: '7d', // Token expires in 7 days
    }
  );
};


