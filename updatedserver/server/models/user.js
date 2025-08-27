import bcrypt from 'bcryptjs';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', { id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false, }, email: { type: DataTypes.STRING(255), unique: true, allowNull: false, validate: { isEmail: true, }, }, phone: { type: DataTypes.STRING(20), unique: true, }, password_hash: { type: DataTypes.STRING(255), allowNull: false, }, email_verified: { type: DataTypes.BOOLEAN, defaultValue: false, }, phone_verified: { type: DataTypes.BOOLEAN, defaultValue: false, }, role: { type: DataTypes.STRING(20), defaultValue: 'user', validate: { isIn: [['admin', 'user', 'vendor']], }, }, status: { type: DataTypes.STRING(20), defaultValue: 'active', validate: { isIn: [['active', 'inactive']], }, }, is_active: { type: DataTypes.BOOLEAN, defaultValue: true, }, last_login_at: DataTypes.DATE, reward_points: { type: DataTypes.INTEGER, defaultValue: 0, }, }, { tableName: 'users', timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at', hooks: { beforeCreate: async (user) => { if (user.password_hash) { const salt = await bcrypt.genSalt(10); user.password_hash = await bcrypt.hash(user.password_hash, salt); } }, } });
  User.prototype.comparePassword = async function (enteredPassword) { return await bcrypt.compare(enteredPassword, this.password_hash); };
  User.associate = (models) => { User.hasOne(models.Profile, { foreignKey: 'user_id', as: 'profile' }); };
  return User;
};
