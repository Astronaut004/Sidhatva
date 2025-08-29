// stockTransaction.js
// models/stockTransaction.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const StockTransaction = sequelize.define(
    "StockTransaction",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      product_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      variant_id: {
        type: DataTypes.BIGINT,
      },

      transaction_type: {
        type: DataTypes.ENUM(
          "purchase",
          "sale",
          "adjustment",
          "return",
          "damage",
          "transfer",
          "manufacture"
        ),
        allowNull: false,
      },

      transaction_reason: {
        type: DataTypes.STRING(255),
      },

      reference_type: {
        type: DataTypes.ENUM(
          "order",
          "return",
          "adjustment",
          "purchase_order",
          "transfer",
          "manual"
        ),
      },

      reference_id: {
        type: DataTypes.BIGINT,
      },

      quantity_before: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      quantity_change: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      quantity_after: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      unit_cost: {
        type: DataTypes.DECIMAL(10, 2),
      },

      total_cost: {
        type: DataTypes.DECIMAL(10, 2),
      },

      warehouse_location: {
        type: DataTypes.STRING(100),
      },

      bin_location: {
        type: DataTypes.STRING(50),
      },

      batch_number: {
        type: DataTypes.STRING(100),
      },

      lot_number: {
        type: DataTypes.STRING(100),
      },

      expiry_date: {
        type: DataTypes.DATEONLY,
      },

      manufacture_date: {
        type: DataTypes.DATEONLY,
      },

      performed_by: {
        type: DataTypes.BIGINT,
      },

      notes: {
        type: DataTypes.TEXT,
      },

      automated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      status: {
        type: DataTypes.ENUM("pending", "completed", "cancelled", "reversed"),
        defaultValue: "completed",
      },

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },

      created_by: {
        type: DataTypes.BIGINT,
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
      tableName: "stock_transactions",
      timestamps: false, // handling manually
    }
  );

  // Associations
  StockTransaction.associate = (models) => {
    StockTransaction.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });

    StockTransaction.belongsTo(models.ProductVariant, {
      foreignKey: "variant_id",
      as: "variant",
    });

    StockTransaction.belongsTo(models.User, {
      foreignKey: "performed_by",
      as: "performedBy",
    });

    StockTransaction.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
    });
  };

  return StockTransaction;
};
