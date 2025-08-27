import db from '../models/index.js';
const { User, Profile } = db;

export const getAllUsers = async () => {
  return User.findAll({
    attributes: { exclude: ['password_hash'] },
    include: {
      model: Profile,
      as: 'profile',
      attributes: ['first_name', 'last_name']
    },
    order: [['created_at', 'DESC']]
  });
};

export const updateUser = async (userId, updateData) => {
  const user = await User.findByPk(userId);
  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }
  const allowedUpdates = {
    role: updateData.role,
    status: updateData.status
  };
  await user.update(allowedUpdates);
  const updatedUser = user.toJSON();
  delete updatedUser.password_hash;
  return updatedUser;
};
