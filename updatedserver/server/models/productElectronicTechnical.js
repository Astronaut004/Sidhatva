// models/electronicsTechnicalData.js
import { DataTypes } from "sequelize";

export default (sequelize) => {
  const ElectronicsTechnicalData = sequelize.define(
    "ElectronicsTechnicalData",
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
      ordering_code: {
        type: DataTypes.STRING(100),
      },
      power: {
        type: DataTypes.DECIMAL(10, 2),
      },
      voltage: {
        type: DataTypes.DECIMAL(10, 2),
      },
      luminous_flux: {
        type: DataTypes.DECIMAL(10, 2),
      },
      cct: {
        type: DataTypes.DECIMAL(10, 2), // Correlated Color Temperature
      },
      beam_angle: {
        type: DataTypes.DECIMAL(5, 2),
      },
      luminous_efficiency: {
        type: DataTypes.DECIMAL(10, 2),
      },
      cri: {
        type: DataTypes.DECIMAL(5, 2), // Color Rendering Index
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
      tableName: "electronics_technical_data",
      timestamps: false,
      underscored: true,
    }
  );

  // Associations
  ElectronicsTechnicalData.associate = (models) => {
    ElectronicsTechnicalData.belongsTo(models.ElectronicsProduct, {
      foreignKey: "electronics_id",
      as: "electronicsProduct",
      onDelete: "CASCADE",
    });
  };

  return ElectronicsTechnicalData;
};