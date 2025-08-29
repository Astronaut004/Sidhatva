// models/returnItem.js
export default (sequelize, DataTypes) => {
  const ReturnItem = sequelize.define(
    "ReturnItem",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      return_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      order_item_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      variant_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      product_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      product_sku: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      quantity_ordered: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity_returned: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      condition_received: {
        type: DataTypes.ENUM("new", "used", "damaged", "defective", "incomplete"),
      },
      item_notes: {
        type: DataTypes.TEXT,
      },
      restockable: {
        type: DataTypes.BOOLEAN,
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
      tableName: "return_items",
      timestamps: false,
    }
  );

  // Associations
  ReturnItem.associate = (models) => {
    ReturnItem.belongsTo(models.Return, {
      foreignKey: "return_id",
      as: "return",
    });
    ReturnItem.belongsTo(models.OrderItem, {
      foreignKey: "order_item_id",
      as: "orderItem",
    });
    ReturnItem.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
    ReturnItem.belongsTo(models.ProductVariant, {
      foreignKey: "variant_id",
      as: "variant",
    });
    ReturnItem.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
    });
  };

  return ReturnItem;
};
