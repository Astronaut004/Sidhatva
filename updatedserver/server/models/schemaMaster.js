// models/schemaMaster.js
export default (sequelize, DataTypes) => {
  const SchemeMaster = sequelize.define(
    "SchemeMaster",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      type: {
        type: DataTypes.ENUM(
          "percentage",
          "fixed",
          "buy_x_get_y",
          "free_shipping"
        ),
        allowNull: false,
      },
      value: {
        type: DataTypes.DECIMAL(10, 2),
      },
      conditions: {
        type: DataTypes.JSON, // Flexible rules: e.g. { min_qty: 2, category_id: 3 }
      },
      applicable_to: {
        type: DataTypes.STRING(50), // e.g. "product", "category", "cart"
        allowNull: false,
      },
      min_order_amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      max_discount_amount: {
        type: DataTypes.DECIMAL(10, 2),
      },
      usage_limit: {
        type: DataTypes.INTEGER,
      },
      usage_limit_per_user: {
        type: DataTypes.INTEGER,
      },
      current_usage: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      valid_from: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      valid_to: {
        type: DataTypes.DATE,
        allowNull: false,
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
      tableName: "scheme_master",
      timestamps: false, // already using created_at, updated_at
      underscored: true,
    }
  );

  // Associations
  SchemeMaster.associate = (models) => {
    SchemeMaster.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
      onDelete: "SET NULL",
    });

    // (Optional) Later you can link schemes to products/categories
    // SchemeMaster.belongsToMany(models.Product, {
    //   through: "product_schemes",
    //   foreignKey: "scheme_id",
    //   as: "products",
    // });
  };

  return SchemeMaster;
};
