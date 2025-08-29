export default (sequelize, DataTypes) => {
  const Order = sequelize.define(
    "Order",
    {
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
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      created_by: {
        type: DataTypes.BIGINT,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "confirmed",
          "processing",
          "shipped",
          "delivered",
          "cancelled",
          "refunded",
          "failed"
        ),
        defaultValue: "pending",
      },
      payment_status: {
        type: DataTypes.ENUM(
          "pending",
          "paid",
          "failed",
          "refunded",
          "partially_refunded"
        ),
        defaultValue: "pending",
      },
      payment_method: {
        type: DataTypes.STRING(50),
      },
      billing_address_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "addresses",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      shipping_address_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "addresses",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      // Billing fields
      billing_first_name: DataTypes.STRING(100),
      billing_last_name: DataTypes.STRING(100),
      billing_type: DataTypes.STRING(100),
      billing_id: DataTypes.STRING(255),
      billing_address_2: DataTypes.STRING(255),
      billing_city: DataTypes.STRING(100),
      billing_state: DataTypes.STRING(100),
      billing_postal_code: DataTypes.STRING(20),
      billing_country: DataTypes.STRING(100),
      billing_phone: DataTypes.STRING(20),
      billing_email: DataTypes.STRING(255),

      // Shipping fields
      shipping_first_name: DataTypes.STRING(100),
      shipping_last_name: DataTypes.STRING(100),
      shipping_company: DataTypes.STRING(100),
      shipping_address_1: DataTypes.STRING(255),
      shipping_address_2: DataTypes.STRING(255),
      shipping_city: DataTypes.STRING(100),
      shipping_state: DataTypes.STRING(100),
      shipping_postal_code: DataTypes.STRING(20),
      shipping_country: DataTypes.STRING(100),
      shipping_phone: DataTypes.STRING(20),

      // Amounts
      subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
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
        allowNull: false,
        defaultValue: 0.0,
      },
      currency: {
        type: DataTypes.STRING(3),
        defaultValue: "INR",
      },

      // Notes
      notes: DataTypes.TEXT,
      customer_notes: DataTypes.TEXT,

      // Dates
      order_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      shipped_date: DataTypes.DATE,
      delivered_date: DataTypes.DATE,

      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "orders",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Associations
  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
    Order.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
    Order.belongsTo(models.Address, { foreignKey: "billing_address_id", as: "billing_address" });
    Order.belongsTo(models.Address, { foreignKey: "shipping_address_id", as: "shipping_address" });

    // You’ll probably also have an OrderItem model for products inside orders
    Order.hasMany(models.OrderItem, { foreignKey: "order_id", as: "items" });
  };

  return Order;
};
