// models/cart.js
export default (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      session_id: {
        type: DataTypes.STRING(255), // for guest users
      },
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      tax_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      shipping_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      currency: {
        type: DataTypes.STRING(3),
        defaultValue: "INR",
      },
      expires_at: {
        type: DataTypes.DATE,
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
      tableName: "carts",
      timestamps: false, // using manual created_at & updated_at
      underscored: true,
    }
  );

  // Associations
  Cart.associate = (models) => {
    Cart.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
      onDelete: "CASCADE",
    });

    Cart.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
      onDelete: "CASCADE",
    });

    // A cart can have many cart items
    Cart.hasMany(models.CartItem, {
      foreignKey: "cart_id",
      as: "items",
      onDelete: "CASCADE",
    });
  };

  return Cart;
};
