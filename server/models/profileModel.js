// --- File: models/profile.js ---

export const ProfileModel = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users', // Matches the table name for the User model
        key: 'id',
      },
    },
    first_name: {
      type: DataTypes.STRING(100),
    },
    last_name: {
      type: DataTypes.STRING(100),
    },
    full_name: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.first_name || ''} ${this.last_name || ''}`.trim();
      },
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    gender: {
      type: DataTypes.STRING(20),
      validate: {
        isIn: [['male', 'female', 'other', 'prefer_not_to_say']],
      },
    },
    avatar_url: {
      type: DataTypes.STRING(500),
    },
    bio: {
      type: DataTypes.TEXT,
    },
  }, {
    tableName: 'profiles',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user',
    });
  };

  return Profile;
};
