// models/return.js
export default (sequelize, DataTypes) => {
  const Return = sequelize.define(
    "Return",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      return_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      order_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      customer_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      // ENUMs
      type: {
        type: DataTypes.ENUM("return", "exchange", "refund"),
        defaultValue: "return",
      },
      reason: {
        type: DataTypes.ENUM(
          "defective",
          "wrong_item",
          "not_as_described",
          "damaged_in_shipping",
          "no_longer_needed",
          "size_issue",
          "other"
        ),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "requested",
          "approved",
          "rejected",
          "pickup_scheduled",
          "picked_up",
          "received",
          "inspected",
          "processed",
          "completed",
          "cancelled"
        ),
        defaultValue: "requested",
      },
      who_pays_return_shipping: {
        type: DataTypes.ENUM("customer", "merchant", "split"),
        defaultValue: "customer",
      },
      received_condition: {
        type: DataTypes.ENUM("new", "used", "damaged", "defective", "incomplete"),
      },
      refund_method: {
        type: DataTypes.ENUM("original_payment", "store_credit", "bank_transfer", "cash"),
      },

      // Text & JSON
      detailed_reason: { type: DataTypes.TEXT },
      inspection_notes: { type: DataTypes.TEXT },
      customer_comments: { type: DataTypes.TEXT },
      return_address: { type: DataTypes.JSON },
      images: { type: DataTypes.JSON },

      // Numeric
      return_policy_days: { type: DataTypes.INTEGER, defaultValue: 30 },
      is_within_policy: { type: DataTypes.BOOLEAN, defaultValue: true },
      total_return_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
        validate: { min: 0 },
      },
      refund_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
        validate: { min: 0 },
      },
      restocking_fee: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
        validate: { min: 0 },
      },
      shipping_cost_refund: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
        validate: { min: 0 },
      },
      return_shipping_cost: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
        validate: { min: 0 },
      },

      // Shipping details
      return_shipping_method: { type: DataTypes.STRING(100) },
      return_tracking_number: { type: DataTypes.STRING(100) },
      return_label_url: { type: DataTypes.STRING(500) },

      // Status flags
      restockable: { type: DataTypes.BOOLEAN },
      is_prepaid_return: { type: DataTypes.BOOLEAN, defaultValue: false },
      is_active: { type: DataTypes.BOOLEAN, defaultValue: true },

      // Refund details
      refund_reference: { type: DataTypes.STRING(255) },

      // Dates
      requested_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      approved_date: { type: DataTypes.DATE },
      pickup_scheduled_date: { type: DataTypes.DATE },
      picked_up_date: { type: DataTypes.DATE },
      received_date: { type: DataTypes.DATE },
      inspected_date: { type: DataTypes.DATE },
      processed_date: { type: DataTypes.DATE },
      completed_date: { type: DataTypes.DATE },

      // Foreign keys
      approved_by: { type: DataTypes.BIGINT },
      processed_by: { type: DataTypes.BIGINT },
      created_by: { type: DataTypes.BIGINT },

      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      tableName: "returns",
      timestamps: false, // using manual created_at / updated_at
    }
  );

  Return.associate = (models) => {
    Return.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });
    Return.belongsTo(models.User, {
      foreignKey: "customer_id",
      as: "customer",
    });
    Return.belongsTo(models.User, {
      foreignKey: "approved_by",
      as: "approver",
    });
    Return.belongsTo(models.User, {
      foreignKey: "processed_by",
      as: "processor",
    });
    Return.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
    });
  };

  return Return;
};
