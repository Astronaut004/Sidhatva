// models/shipment.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Shipment = sequelize.define(
    "Shipment",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      order_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      tracking_number: {
        type: DataTypes.STRING(100),
        unique: true,
      },

      carrier: {
        type: DataTypes.STRING(100),
      },

      carrier_service: {
        type: DataTypes.STRING(100),
      },

      shipped_from_address: {
        type: DataTypes.JSON,
      },

      shipped_to_address: {
        type: DataTypes.JSON,
        allowNull: false,
      },

      weight: {
        type: DataTypes.DECIMAL(8, 3),
      },

      package_count: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },

      package_type: {
        type: DataTypes.STRING(50),
      },

      status: {
        type: DataTypes.ENUM(
          "pending",
          "picked_up",
          "in_transit",
          "out_for_delivery",
          "delivered",
          "failed_delivery",
          "returned",
          "cancelled"
        ),
        defaultValue: "pending",
      },

      delivery_type: {
        type: DataTypes.ENUM(
          "standard",
          "express",
          "same_day",
          "scheduled"
        ),
        defaultValue: "standard",
      },

      shipping_cost: {
        type: DataTypes.DECIMAL(10, 2),
      },

      estimated_delivery_date: {
        type: DataTypes.DATEONLY,
      },

      shipped_date: {
        type: DataTypes.DATE,
      },

      delivered_date: {
        type: DataTypes.DATE,
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
      tableName: "shipments",
      timestamps: false, // already handling manually
    }
  );

  // Associations
  Shipment.associate = (models) => {
    Shipment.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });

    Shipment.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
    });
  };

  return Shipment;
};
