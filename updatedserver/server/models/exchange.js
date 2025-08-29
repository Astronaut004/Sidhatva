// models/returnExchange.js
export default (sequelize, DataTypes) => {
  const ReturnExchange = sequelize.define(
    "ReturnExchange",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      return_item_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      exchange_product_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      exchange_variant_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price_difference: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
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
      tableName: "return_exchanges",
      timestamps: false,
    }
  );

  // Associations
  ReturnExchange.associate = (models) => {
    ReturnExchange.belongsTo(models.ReturnItem, {
      foreignKey: "return_item_id",
      as: "returnItem",
    });
    ReturnExchange.belongsTo(models.Product, {
      foreignKey: "exchange_product_id",
      as: "exchangeProduct",
    });
    ReturnExchange.belongsTo(models.ProductVariant, {
      foreignKey: "exchange_variant_id",
      as: "exchangeVariant",
    });
    ReturnExchange.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
    });
  };

  return ReturnExchange;
};
