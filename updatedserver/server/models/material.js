// material.js

// models/material.js
export default (sequelize, DataTypes) => {
  const Material = sequelize.define(
    "Material",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      properties: {
        type: DataTypes.JSON, // JSON column for storing properties like { durability: "high", washable: true }
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_by: {
        type: DataTypes.BIGINT,
        references: {
          model: "Users", // Must match your users table/model
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
      tableName: "materials",
      timestamps: false, // we already have created_at & updated_at
    }
  );

  // Associations
  Material.associate = (models) => {
    Material.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
      onDelete: "SET NULL",
    });
  };

  return Material;
};
