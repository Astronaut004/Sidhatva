// color.js

// models/color.js
export default (sequelize, DataTypes) => {
  const Color = sequelize.define(
    "Color",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      hex_code: {
        type: DataTypes.STRING(7), // e.g., #FFFFFF
        validate: {
          is: /^#([0-9A-Fa-f]{6})$/, // validation for hex format
        },
      },
      rgb_code: {
        type: DataTypes.STRING(20), // e.g., rgb(255,255,255)
        validate: {
          is: /^rgb\((\d{1,3}),\s?(\d{1,3}),\s?(\d{1,3})\)$/, // rgb validation
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_by: {
        type: DataTypes.BIGINT,
        references: {
          model: "Users",
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
      tableName: "colors",
      timestamps: false, // handled manually
    }
  );

  // Associations
  Color.associate = (models) => {
    Color.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
      onDelete: "SET NULL",
    });

    // Optional: If you want products to have colors
    // Color.hasMany(models.Product, {
    //   foreignKey: "color_id",
    //   as: "products",
    // });
  };

  return Color;
};
