export default (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    "OrderItem",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "orders",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      product_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      variant_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "product_variants",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      product_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      product_sku: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      quantity: {
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
      product_data: {
        type: DataTypes.JSON,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_by: {
        type: DataTypes.BIGINT,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      guest_id: {
        type: DataTypes.UUID,
      },
    },
    {
      tableName: "order_items",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Associations
  OrderItem.associate = (models) => {
    OrderItem.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
    OrderItem.belongsTo(models.Product, { foreignKey: "product_id", as: "product" });
    OrderItem.belongsTo(models.ProductVariant, { foreignKey: "variant_id", as: "variant" });
    OrderItem.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
  };

  return OrderItem;
};
