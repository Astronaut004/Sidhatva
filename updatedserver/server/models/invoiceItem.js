// models/invoiceItem.js
export default (sequelize, DataTypes) => {
  const InvoiceItem = sequelize.define(
    "InvoiceItem",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      invoice_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      variant_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      item_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      item_description: {
        type: DataTypes.TEXT,
      },
      sku: {
        type: DataTypes.STRING(100),
      },
      hsn_code: {
        type: DataTypes.STRING(20),
      },
      quantity: {
        type: DataTypes.DECIMAL(10, 3),
        allowNull: false,
        defaultValue: 1,
        validate: {
          min: 0,
        },
      },
      unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        validate: {
          min: 0,
        },
      },
      line_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      tax_rate: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0.0,
      },
      tax_amount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.0,
      },
      sort_order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
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
      tableName: "invoice_items",
      timestamps: false, // using created_at/updated_at manually
    }
  );

  InvoiceItem.associate = (models) => {
    InvoiceItem.belongsTo(models.Invoice, {
      foreignKey: "invoice_id",
      as: "invoice",
    });
    InvoiceItem.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
    });
    InvoiceItem.belongsTo(models.ProductVariant, {
      foreignKey: "variant_id",
      as: "variant",
    });
    InvoiceItem.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
    });
  };

  return InvoiceItem;
};
