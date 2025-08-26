// --- File: models/cartModels.js ---

export const CartModel = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    session_id: { // For guest carts
      type: DataTypes.STRING(255),
    },
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    tax_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    shipping_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    discount_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: 'carts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Cart.associate = (models) => {
    Cart.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Cart.hasMany(models.CartItem, { foreignKey: 'cart_id', as: 'items' });
  };

  return Cart;
};


export const CartItemModel = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    cart_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'carts',
        key: 'id',
      },
    },
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    variant_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'product_variants',
        key: 'id',
      },
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
  }, {
    tableName: 'cart_items',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        unique: true,
        fields: ['cart_id', 'product_id', 'variant_id'],
      },
    ],
  });

  CartItem.associate = (models) => {
    CartItem.belongsTo(models.Cart, { foreignKey: 'cart_id', as: 'cart' });
    CartItem.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
    // Add association for ProductVariant if created
  };

  return CartItem;
};
