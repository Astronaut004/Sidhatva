// --- File: config/index.js ---

// This file reads your .env file and exports the variables
// in a clean, organized object for the rest of your application to use.

require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  db: {
    dialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
};