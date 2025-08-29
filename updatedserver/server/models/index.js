import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import Sequelize from 'sequelize';
import config from '../config/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,
  logging: false,
});

// Dynamically import all model files from the directory
const files = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js'
    );
  });

for (const file of files) {
  // THE FIX: Use pathToFileURL to correctly create a URL for import()
  const filePath = path.join(__dirname, file);
  const moduleURL = pathToFileURL(filePath).href;
  const module = await import(moduleURL);
  
  const model = module.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Export all models individually and as part of the db object
export const { User, Profile, Product, ProductCategory, Brand, Cart, CartItem, Order, OrderItem, Address, Wishlist, WishlistItem, Review, Otp, Material, Color, ProductVariant, ProductImage, SchemeMaster, Tax, Payment, Shipment, StockTransaction, Invoice, InvoiceItem, Return, ReturnItem, Refund, ReturnExchange } = db;
export default db;
