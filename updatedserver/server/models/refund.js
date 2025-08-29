// models/refund.js
export default (sequelize, DataTypes) => {
  const Refund = sequelize.define(
    "Refund",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      refund_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      order_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      return_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      payment_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      customer_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      // ENUM fields
      type: {
        type: DataTypes.ENUM("full_refund", "partial_refund", "store_credit", "exchange_adjustment"),
        defaultValue: "partial_refund",
      },
      method: {
        type: DataTypes.ENUM("original_payment", "store_credit", "bank_transfer", "cash", "check"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "processing", "completed", "failed", "cancelled"),
        defaultValue: "pending",
      },

      // Monetary fields
      refund_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      processing_fee: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      net_refund_amount: {
        type: DataTypes.VIRTUAL,
        get() {
          const refund = parseFloat(this.refund_amount || 0);
          const fee = parseFloat(this.processing_fee || 0);
          return (refund - fee).toFixed(2);
        },
      },
      store_credit_amount: {
        type: DataTypes.DECIMAL(10, 2),
      },

      // Gateway info
      gateway_name: { type: DataTypes.STRING(50) },
      gateway_transaction_id: { type: DataTypes.STRING(255) },
      gateway_refund_id: { type: DataTypes.STRING(255) },
      gateway_response: { type: DataTypes.JSON },

      store_credit_code: { type: DataTypes.STRING(50) },
      store_credit_expiry_date: { type: DataTypes.DATE },

      // Notes
      reason: { type: DataTypes.TEXT },
      internal_notes: { type: DataTypes.TEXT },
      customer_notification_sent: { type: DataTypes.BOOLEAN, defaultValue: false },

      // Dates
      requested_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      processed_date: { type: DataTypes.DATE },
      completed_date: { type: DataTypes.DATE },

      // Foreign keys for processing
      processed_by: { type: DataTypes.BIGINT },
      approved_by: { type: DataTypes.BIGINT },
      created_by: { type: DataTypes.BIGINT },

      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "refunds",
      timestamps: false,
    }
  );

  // Associations
  Refund.associate = (models) => {
    Refund.belongsTo(models.Order, { foreignKey: "order_id", as: "order" });
    Refund.belongsTo(models.Return, { foreignKey: "return_id", as: "return" });
    Refund.belongsTo(models.Payment, { foreignKey: "payment_id", as: "payment" });
    Refund.belongsTo(models.User, { foreignKey: "customer_id", as: "customer" });
    Refund.belongsTo(models.User, { foreignKey: "processed_by", as: "processor" });
    Refund.belongsTo(models.User, { foreignKey: "approved_by", as: "approver" });
    Refund.belongsTo(models.User, { foreignKey: "created_by", as: "creator" });
  };

  return Refund;
};
