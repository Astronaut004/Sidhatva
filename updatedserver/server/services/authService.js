import db from '../models/index.js';
const { User, Profile, sequelize } = db;

export const register = async (userData) => {
  const { email, password, firstName, lastName, phone } = userData;
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error('A user with this email already exists.');
    error.statusCode = 409;
    throw error;
  }
  const t = await sequelize.transaction();
  try {
    const newUser = await User.create({ email, phone, password_hash: password }, { transaction: t });
    await Profile.create({ user_id: newUser.id, first_name: firstName, last_name: lastName }, { transaction: t });
    await t.commit();
    const createdUserWithProfile = await User.findByPk(newUser.id, {
      include: { model: Profile, as: 'profile' },
      attributes: { exclude: ['password_hash'] }
    });
    return createdUserWithProfile;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || !(await user.comparePassword(password))) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }
  const userJson = user.toJSON();
  delete userJson.password_hash;
  return userJson;
};
