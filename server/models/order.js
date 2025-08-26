// --- File: models/order.js ---

export const OrderModel = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    order_number: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      references: { model: 'users', key: 'id' },
      onDelete: 'SET NULL',
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'failed'),
      defaultValue: 'pending',
    },
    payment_status: {
      type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded', 'partially_refunded'),
      defaultValue: 'pending',
    },
    payment_method: DataTypes.STRING(50),
    billing_address_id: DataTypes.BIGINT,
    shipping_address_id: DataTypes.BIGINT,
    subtotal: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    tax_amount: DataTypes.DECIMAL(10, 2),
    shipping_amount: DataTypes.DECIMAL(10, 2),
    discount_amount: DataTypes.DECIMAL(10, 2),
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
    notes: DataTypes.TEXT,
  }, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Order.hasMany(models.OrderItem, { foreignKey: 'order_id', as: 'items' });
    // Optional: associate addresses if Address model exists
    // Order.belongsTo(models.Address, { foreignKey: 'shipping_address_id', as: 'shippingAddress' });
  };

  return Order;
};
