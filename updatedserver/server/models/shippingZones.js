// models/shippingZones.js
export default (sequelize, DataTypes) => {
  const ShippingZone = sequelize.define(
    "ShippingZone",
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
      countries: {
        type: DataTypes.JSON, // e.g. ["IN","US"]
        allowNull: false,
      },
      states: {
        type: DataTypes.JSON, // e.g. ["UP","DL"]
      },
      postal_codes: {
        type: DataTypes.JSON, // e.g. ["110001","201301"]
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
      tableName: "shipping_zones",
      timestamps: false, // already handling created_at & updated_at manually
      underscored: true,
    }
  );

  // Associations
  ShippingZone.associate = (models) => {
    ShippingZone.belongsTo(models.User, {
      foreignKey: "created_by",
      as: "creator",
      onDelete: "SET NULL",
    });

    // 🔗 A zone can have multiple shipping rates/methods
    ShippingZone.hasMany(models.Shipment, {
      foreignKey: "zone_id",
      as: "shippingMethods",
      onDelete: "CASCADE",
    });

    // 🔗 Taxes may depend on shipping zones
    ShippingZone.hasMany(models.Tax, {
      foreignKey: "shipping_zone_id",
      as: "taxes",
      onDelete: "SET NULL",
    });
  };

  return ShippingZone;
};
