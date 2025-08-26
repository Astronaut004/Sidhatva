import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';
import { db as config } from '../config.js'; // Ensure your config path is correct

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = {};

// Initialize Sequelize with your database configuration
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: false, // Set to console.log to see SQL queries
});

// Dynamically import all model files in this directory
const modelFiles = fs.readdirSync(__dirname)
  .filter(file => (
    file.indexOf('.') !== 0 &&
    file !== path.basename(__filename) &&
    file.slice(-3) === '.js'
  ));

for (const file of modelFiles) {
  // Dynamic import of each model
  const { default: modelImporter } = await import(path.join(__dirname, file));
  
  // Initialize model
  // Check if modelExporter is a function returning model
  const model = typeof modelImporter === 'function'
    ? modelImporter(sequelize, Sequelize.DataTypes)
    : modelImporter;

  db[model.name] = model;
}

// Establish associations
Object.values(db).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;