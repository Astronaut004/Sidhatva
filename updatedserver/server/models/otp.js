export default (sequelize, DataTypes) => {
  const Otp = sequelize.define(
    "Otp",
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      identifier: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      identifier_type: {
        type: DataTypes.ENUM("email", "phone"),
        allowNull: false,
      },
      otp_code: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      purpose: {
        type: DataTypes.ENUM(
          "registration",
          "login",
          "password_reset",
          "phone_verification",
          "email_verification"
        ),
        allowNull: false,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      used_at: {
        type: DataTypes.DATE,
      },
      attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      max_attempts: {
        type: DataTypes.INTEGER,
        defaultValue: 3,
      },
      is_used: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "otps",
      timestamps: false, // since we are manually using created_at
    }
  );

  return Otp;
};