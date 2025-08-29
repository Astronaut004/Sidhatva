// models/product.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      barcode: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      comp_code: {
        type: DataTypes.STRING(50),
      },
      sku: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(300),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      short_description: {
        type: DataTypes.TEXT,
      },
      category_id: {
        type: DataTypes.BIGINT,
        references: { model: "product_categories", key: "id" },
        onDelete: "CASCADE",
      },
      sub_category_id: {
        type: DataTypes.BIGINT,
        references: { model: "sub_categories", key: "id" },
        onDelete: "CASCADE",
      },
      brand_id: {
        type: DataTypes.BIGINT,
        references: { model: "brands", key: "id" },
        onDelete: "SET NULL",
      },
      material_id: {
        type: DataTypes.BIGINT,
        references: { model: "materials", key: "id" },
        onDelete: "SET NULL",
      },
      color_id: {
        type: DataTypes.BIGINT,
        references: { model: "colors", key: "id" },
        onDelete: "SET NULL",
      },
      type: {
        type: DataTypes.ENUM("simple", "variable", "grouped", "external"),
        defaultValue: "simple",
      },
      status: {
        type: DataTypes.ENUM("draft", "published", "archived"),
        defaultValue: "draft",
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      visibility: {
        type: DataTypes.ENUM("visible", "hidden", "catalog", "search"),
        defaultValue: "visible",
      },
      featured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      weight: {
        type: DataTypes.DECIMAL(10, 3),
      },
      dimensions: {
        type: DataTypes.JSON, // { length, width, height }
      },
      shipping_required: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      tax_status: {
        type: DataTypes.ENUM("taxable", "shipping", "none"),
        defaultValue: "taxable",
      },
      manage_stock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      stock_status: {
        type: DataTypes.ENUM("instock", "outofstock", "onbackorder"),
        defaultValue: "instock",
      },
      backorders_allowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      sold_individually: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      unit_factor: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 1.0,
      },
      unit_code: {
        type: DataTypes.STRING(20),
        defaultValue: "pcs",
      },
      cost_price: {
        type: DataTypes.DECIMAL(12, 2),
      },
      selling_price: {
        type: DataTypes.DECIMAL(12, 2),
      },
      discount_amount: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0,
      },
      discount_percent: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0,
      },
      reviews_allowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      average_rating: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0.0,
      },
      rating_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      total_sales: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      seo_title: {
        type: DataTypes.STRING(200),
      },
      seo_description: {
        type: DataTypes.TEXT,
      },
      created_by: {
        type: DataTypes.BIGINT,
        references: { model: "users", key: "id" },
        onDelete: "SET NULL",
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "products",
      timestamps: false, // you already manage created_at, updated_at manually
      underscored: true, // ensures Sequelize maps snake_case columns properly
    }
  );

  // Associations
  Product.associate = (models) => {
    Product.belongsTo(models.ProductCategory, {
      foreignKey: "category_id",
    });
    Product.belongsTo(models.SubCategory, {
      foreignKey: "sub_category_id",
    });
    Product.belongsTo(models.Brand, {
      foreignKey: "brand_id",
    });
    Product.belongsTo(models.Material, {
      foreignKey: "material_id",
    });
    Product.belongsTo(models.Color, {
      foreignKey: "color_id",
    });
    Product.belongsTo(models.User, {
      foreignKey: "created_by",
    });
  };

  return Product;
};