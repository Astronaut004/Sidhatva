import { Address, sequelize } from '../models';

/**
 * Creates a new address for a user.
 * If this address is set as the default, it ensures all other addresses for that user are not default.
 * @param {number} userId - The ID of the user creating the address.
 * @param {object} addressData - The data for the new address.
 * @returns {Promise<object>} The newly created address object.
 */
export const createAddress = async (userId, addressData) => {
  const { is_default } = addressData;

  // Use a transaction to ensure data integrity, especially when updating other records.
  const t = await sequelize.transaction();
  try {
    // If the new address is intended to be the default...
    if (is_default) {
      // ...first, set all other addresses for this user to NOT be the default.
      await Address.update(
        { is_default: false },
        { where: { user_id: userId }, transaction: t }
      );
    }

    // Now, create the new address.
    const newAddress = await Address.create(
      { ...addressData, user_id: userId },
      { transaction: t }
    );

    // Commit the transaction if everything was successful.
    await t.commit();
    return newAddress;

  } catch (error) {
    // If any part fails, roll back all changes.
    await t.rollback();
    throw error;
  }
};

/**
 * Retrieves all addresses for a specific user.
 * @param {number} userId - The ID of the user.
 * @returns {Promise<Array>} An array of the user's addresses.
 */
export const getUserAddresses = async (userId) => {
  const addresses = await Address.findAll({
    where: { user_id: userId, is_active: true },
    order: [
      ['is_default', 'DESC'],  // Show default address first
      ['updated_at', 'DESC']
    ],
  });
  return addresses;
};
