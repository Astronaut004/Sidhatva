// models/user.js
import bcrypt from "bcryptjs";

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        unique: true,
        validate: { isEmail: true },
      },
      phone: {
        type: DataTypes.STRING(20),
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING(255),
      },
      email_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      phone_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "user", "vendor"),
        defaultValue: "user",
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        defaultValue: "active",
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      last_login_at: {
        type: DataTypes.DATE,
      },
      last_purchase_date: {
        type: DataTypes.DATEONLY,
      },
      login_attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      reward_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      referral_code: {
        type: DataTypes.STRING(50),
      },
      notes: {
        type: DataTypes.STRING(255),
      },
    },
    {
      tableName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      hooks: {
        beforeCreate: async (user) => {
          if (user.password_hash) {
            const salt = await bcrypt.genSalt(12);
            user.password_hash = await bcrypt.hash(user.password_hash, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed("password_hash")) {
            const salt = await bcrypt.genSalt(12);
            user.password_hash = await bcrypt.hash(user.password_hash, salt);
          }
        },
      },
    }
  );

  // Instance method to compare passwords
  User.prototype.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password_hash);
  };

  // Associations
  User.associate = (models) => {
    User.hasOne(models.Profile, {
      foreignKey: "user_id",
      as: "profile",
    });
    User.hasMany(models.Address, {
      foreignKey: "user_id",
      as: "addresses",
    });
    User.hasMany(models.Brand, {
      foreignKey: "created_by",
      as: "brands",
    });
    User.hasMany(models.Product, {
      foreignKey: "created_by",
      as: "products",
    });
  };

  return User;
};