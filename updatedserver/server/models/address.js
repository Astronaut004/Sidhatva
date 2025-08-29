// models/address.js
export default (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "Address",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      type: {
        type: DataTypes.STRING(20),
        defaultValue: "home",
        validate: {
          isIn: [["home", "work", "billing", "shipping", "other"]],
        },
      },
      label: {
        type: DataTypes.STRING(100),
      },
      recipient_name: {
        type: DataTypes.STRING(200),
      },
      recipient_phone: {
        type: DataTypes.STRING(20),
        validate: {
          is: /^[0-9]{10,15}$/i, // adjust length for country format
        },
      },
      address_line_1: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      address_line_2: {
        type: DataTypes.STRING(255),
      },
      city: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      postal_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING(100),
        allowNull: false,
        defaultValue: "India",
      },
      landmark: {
        type: DataTypes.STRING(255),
      },
      is_default: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "addresses",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      underscored: true,
    }
  );

  Address.associate = (models) => {
    Address.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
  };

  return Address;
};
