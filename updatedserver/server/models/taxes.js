// taxes.js
// models/taxes.js
export default (sequelize, DataTypes) => {
  const Tax = sequelize.define(
    "Tax",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      rate: {
        type: DataTypes.DECIMAL(4, 2), // e.g. 18.00%
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("inclusive", "exclusive"),
        defaultValue: "exclusive",
      },
      applicable_to: {
        type: DataTypes.ENUM("all", "categories", "products"),
        defaultValue: "all",
      },
      category_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "product_categories",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      product_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "products",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      shipping_zone_id: {
        type: DataTypes.BIGINT,
        references: {
          model: "shipping_zones",
          key: "id",
        },
        onDelete: "SET NULL",
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
      tableName: "taxes",
      timestamps: false, // already tracking created_at & updated_at
      underscored: true,
    }
  );

  // Associations
  Tax.associate = (models) => {
    Tax.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
      onDelete: "SET NULL",
    });

    Tax.belongsTo(models.ProductCategory, {
      foreignKey: "category_id",
      as: "category",
      onDelete: "CASCADE",
    });

    Tax.belongsTo(models.Product, {
      foreignKey: "product_id",
      as: "product",
      onDelete: "CASCADE",
    });

    Tax.belongsTo(models.ShippingZone, {
      foreignKey: "shipping_zone_id",
      as: "shippingZone",
      onDelete: "SET NULL",
    });
  };

  return Tax;
};
