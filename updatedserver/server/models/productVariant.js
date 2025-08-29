// models/productVariant.js
export default (sequelize, DataTypes) => {
  const ProductVariant = sequelize.define(
    "ProductVariant",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      sku: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(255),
      },
      description: {
        type: DataTypes.TEXT,
      },
      price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      cost_price: {
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
      weight: {
        type: DataTypes.DECIMAL(10, 3),
      },
      dimensions: {
        type: DataTypes.JSON, // { length, width, height }
      },
      stock_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      low_stock_threshold: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
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
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      unit_factor: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 1.0,
      },
      unit_code: {
        type: DataTypes.STRING(20),
        defaultValue: "pcs",
      },
      attributes: {
        type: DataTypes.JSON, // { color_id: 3, size: "L", material_id: 2 }
      },
      created_by: {
        type: DataTypes.BIGINT,
        references: {
          model: "users",
          key: "id",
        },
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
      tableName: "product_variants",
      timestamps: false, // since we manage created_at/updated_at manually
      underscored: true,
    }
  );

  // Associations
  ProductVariant.associate = (models) => {
    ProductVariant.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
      onDelete: "CASCADE",
    });

    ProductVariant.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
      onDelete: "SET NULL",
    });
  };

  return ProductVariant;
};
