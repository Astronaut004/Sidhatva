import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const generateToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};
export default generateToken;
