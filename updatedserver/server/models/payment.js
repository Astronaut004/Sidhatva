export default (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "Payment",
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
      payment_method: {
        type: DataTypes.ENUM(
          "credit_card",
          "debit_card",
          "upi",
          "net_banking",
          "wallet",
          "cod",
          "emi"
        ),
        allowNull: false,
      },
      payment_gateway: {
        type: DataTypes.STRING(50),
      },
      transaction_id: {
        type: DataTypes.STRING(255),
      },
      gateway_transaction_id: {
        type: DataTypes.STRING(255),
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      currency: {
        type: DataTypes.STRING(3),
        defaultValue: "INR",
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "processing",
          "completed",
          "failed",
          "cancelled",
          "refunded"
        ),
        defaultValue: "pending",
      },
      gateway_response: {
        type: DataTypes.JSON,
      },
      failure_reason: {
        type: DataTypes.TEXT,
      },
      processed_at: {
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
        onDelete: "SET NULL",
      },
    },
    {
      tableName: "payments",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  // Associations
  Payment.associate = (models) => {
    Payment.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
    Payment.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
  };

  return Payment;
};
