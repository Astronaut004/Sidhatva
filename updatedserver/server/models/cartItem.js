// models/cartItem.js
export default (sequelize, DataTypes) => {
  const CartItem = sequelize.define(
    "CartItem",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      cart_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "carts",
          key: "id",
        },
        onDelete: "CASCADE",
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
      variant_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "product_variants",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
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
        onDelete: "CASCADE",
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
      tableName: "cart_items",
      timestamps: false, // using manual created_at & updated_at
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["cart_id", "product_id", "variant_id"],
        },
      ],
    }
  );

  // Hooks for updated_at
  CartItem.beforeUpdate((item) => {
    item.updated_at = new Date();
  });

  // Associations
  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, {
      foreignKey: "cart_id",
      as: "cart",
      onDelete: "CASCADE",
    });

    CartItem.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
      onDelete: "CASCADE",
    });

    CartItem.belongsTo(models.ProductVariant, {
      foreignKey: "variant_id",
      as: "variant",
      onDelete: "CASCADE",
    });

    CartItem.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
      onDelete: "CASCADE",
    });
  };

  return CartItem;
};
