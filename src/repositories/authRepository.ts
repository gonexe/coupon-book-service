import User from '../models/user';

/**
 * Creates a new user in the database.
 *
 * @param {string} email - The email of the user.
 * @param {string} hashedPassword - The hashed password of the user.
 * @returns {Promise<User>} - A promise that resolves to the created user.
 */
export const createUser = async (
  email: string,
  hashedPassword: string,
): Promise<User> => {
  return await User.create({ email, password: hashedPassword });
};

/**
 * Finds a user by their email.
 *
 * @param {string} email - The email of the user to find.
 * @returns {Promise<User | null>} - A promise that resolves to the found user or null if no user is found.
 */
export const findUserByEmail = async (email: string): Promise<User | null> => {
  return await User.findOne({ where: { email } });
};

/**
 * Deletes a user by their email for testing purposes.
 *
 * @param {string} email - The email of the user to delete.
 * @returns {Promise<number>} - A promise that resolves to the number of rows deleted.
 */
export const deleteUserByEmailTestingPurpose = async (
  email: string,
): Promise<number> => {
  return await User.destroy({ where: { email } });
};
