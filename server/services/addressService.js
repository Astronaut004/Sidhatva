import db from '../models/index.js';
const { Address, sequelize } = db;

export const createAddress = async (userId, addressData) => {
  const { is_default } = addressData;
  const t = await sequelize.transaction();
  try {
    if (is_default) {
      await Address.update({ is_default: false }, { where: { user_id: userId }, transaction: t });
    }
    const newAddress = await Address.create({ ...addressData, user_id: userId }, { transaction: t });
    await t.commit();
    return newAddress;
  } catch (error) {
    await t.rollback();
    throw error;
  }
};

export const getUserAddresses = async (userId) => {
  return Address.findAll({
    where: { user_id: userId, is_active: true },
    order: [['is_default', 'DESC'], ['updated_at', 'DESC']],
  });
};
