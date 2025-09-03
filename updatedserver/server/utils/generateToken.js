import jwt from 'jsonwebtoken';
import config from '../config/index.js';

const generateToken = (payload) => {
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};
export default generateToken;

// export const generateTokens = (payload) => {
//   const accessToken = jwt.sign(payload, config.jwt.secret, {
//     expiresIn: config.jwt.expiresIn,
//   });

//   const refreshToken = jwt.sign(payload, config.jwt.refreshSecret, {
//     expiresIn: config.jwt.refreshExpiresIn,
//   });

//   return { accessToken, refreshToken };
// };