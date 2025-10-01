// models/electronicsCharacteristics.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const ElectronicsCharacteristics = sequelize.define(
    "ElectronicsCharacteristics",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      electronics_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "electronics_products", key: "id" },
        onDelete: "CASCADE",
      },
      housing_finish: {
        type: DataTypes.TEXT,
      },
      operating_condition: {
        type: DataTypes.TEXT,
      },
      electrical_info: {
        type: DataTypes.JSON, // e.g., { voltage, current, frequency }
      },
      led_lifetime: {
        type: DataTypes.STRING(100),
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
      tableName: "electronics_characteristics",
      timestamps: false,
      underscored: true,
    }
  );

  // Associations
  ElectronicsCharacteristics.associate = (models) => {
    ElectronicsCharacteristics.belongsTo(models.ElectronicsProduct, {
      foreignKey: "electronics_id",
      as: "electronicsProduct",
      onDelete: "CASCADE",
    });
  };

  return ElectronicsCharacteristics;
};
