import jwt from 'jsonwebtoken';
import config from '../config.js'; // Make sure your config file also uses ES module export

const generateToken = (payload) => {
  // The payload typically contains non-sensitive user info like id and role
  return jwt.sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  });
};

export default generateToken;