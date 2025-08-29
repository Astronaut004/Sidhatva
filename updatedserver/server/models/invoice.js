// models/invoice.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Invoice = sequelize.define(
    "Invoice",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },

      order_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },

      invoice_number: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },

      type: {
        type: DataTypes.ENUM(
          "invoice",
          "proforma",
          "credit_note",
          "debit_note"
        ),
        defaultValue: "invoice",
      },

      status: {
        type: DataTypes.ENUM(
          "draft",
          "sent",
          "paid",
          "overdue",
          "cancelled",
          "refunded"
        ),
        defaultValue: "draft",
      },

      parent_invoice_id: {
        type: DataTypes.BIGINT,
      },

      customer_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },

      customer_email: {
        type: DataTypes.STRING(255),
        validate: { isEmail: true },
      },

      customer_phone: {
        type: DataTypes.STRING(20),
      },

      customer_tax_number: {
        type: DataTypes.STRING(50),
      },

      billing_address: {
        type: DataTypes.JSON,
        allowNull: false,
      },

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

      adjustment_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },

      total_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.0,
      },

      paid_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },

      // ❗ Sequelize does not support STORED generated columns directly.
      // We'll treat `balance_due` as a VIRTUAL field.
      balance_due: {
        type: DataTypes.VIRTUAL,
        get() {
          const total = this.getDataValue("total_amount") || 0;
          const paid = this.getDataValue("paid_amount") || 0;
          return parseFloat(total) - parseFloat(paid);
        },
      },

      tax_breakdown: {
        type: DataTypes.JSON,
      },

      place_of_supply: {
        type: DataTypes.STRING(100),
      },

      currency: {
        type: DataTypes.STRING(3),
        defaultValue: "INR",
      },

      exchange_rate: {
        type: DataTypes.DECIMAL(10, 4),
        defaultValue: 1.0,
      },

      payment_terms: {
        type: DataTypes.STRING(255),
      },

      due_date: {
        type: DataTypes.DATEONLY,
      },

      notes: {
        type: DataTypes.TEXT,
      },

      terms_and_conditions: {
        type: DataTypes.TEXT,
      },

      invoice_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      sent_date: {
        type: DataTypes.DATE,
      },

      paid_date: {
        type: DataTypes.DATE,
      },

      pdf_file_url: {
        type: DataTypes.STRING(500),
      },

      is_recurring: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      recurring_frequency: {
        type: DataTypes.ENUM("weekly", "monthly", "quarterly", "yearly"),
      },

      next_invoice_date: {
        type: DataTypes.DATEONLY,
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
      tableName: "invoices",
      timestamps: false, // handled manually
    }
  );

  // Associations
  Invoice.associate = (models) => {
    Invoice.belongsTo(models.Order, {
      foreignKey: "order_id",
      as: "order",
    });

    Invoice.belongsTo(models.Invoice, {
      foreignKey: "parent_invoice_id",
      as: "parentInvoice",
    });

    Invoice.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
    });
  };

  return Invoice;
};
