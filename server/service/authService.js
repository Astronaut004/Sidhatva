import { User, Profile, sequelize } from '../models';

/**
 * Registers a new user and their profile in the database.
 * @param {object} userData - The user's registration data (email, password, firstName, etc.).
 * @returns {Promise<object>} The newly created user object with their profile.
 */
export const register = async (userData) => {
  const { email, password, firstName, lastName, phone } = userData;

  // First, check if a user with this email already exists to prevent duplicates.
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error('A user with this email already exists.');
    error.statusCode = 409; // 409 Conflict
    throw error;
  }

  // Use a database transaction to ensure that both the user and their profile
  // are created successfully. If either fails, the whole operation is rolled back.
  const t = await sequelize.transaction();
  try {
    // Create the user. The password will be automatically hashed by the hook in the User model.
    const newUser = await User.create({
      email,
      phone,
      password_hash: password,
    }, { transaction: t });

    // Create the associated profile for the new user.
    await Profile.create({
      user_id: newUser.id,
      first_name: firstName,
      last_name: lastName,
    }, { transaction: t });

    // If both creations were successful, commit the transaction.
    await t.commit();

    // Fetch the newly created user again, this time including their profile.
    // We exclude the password hash from the final returned object for security.
    const createdUserWithProfile = await User.findByPk(newUser.id, {
      include: { model: Profile, as: 'profile' },
      attributes: { exclude: ['password_hash'] }
    });
    
    return createdUserWithProfile;

  } catch (error) {
    // If any error occurred, roll back the transaction to keep the database clean.
    await t.rollback();
    throw error; // Re-throw the error to be caught by our global error handler.
  }
};

/**
 * Authenticates a user by checking their email and password.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Promise<object>} The authenticated user object (without the password).
 */
export const login = async (email, password) => {
  // Find the user by their email address.
  const user = await User.findOne({ where: { email } });

  // If no user is found, or if the password doesn't match, throw an error.
  // We use the `comparePassword` method we defined in the User model.
  if (!user || !(await user.comparePassword(password))) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401; // 401 Unauthorized
    throw error;
  }
  
  // Return the user object, but remove the password hash before sending it.
  const userJson = user.toJSON();
  delete userJson.password_hash;
  
  return userJson;
};
