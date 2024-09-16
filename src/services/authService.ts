import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '../repositories/authRepository';
import { generateToken } from '../utils/jwt';

/**
 * Registers a new user in the system.
 *
 * @param {string} email - The email of the user to register.
 * @param {string} password - The password of the user to register.
 * @returns {Promise<string>} - A promise that resolves to the generated JWT token.
 * @throws {Error} - Throws an error if a user with the given email already exists.
 */
export const registerUser = async (
  email: string,
  password: string,
): Promise<string> => {
  //  Check if a user with the given email already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  //  Hash the password and create a new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await createUser(email, hashedPassword);

  //  Generate a JWT token for the new user
  const token = generateToken({ userId: newUser.id, email: newUser.email });

  console.log(`Generated JWT for register: ${token}`);
  return token;
};

/**
 * Logs in a user to the system.
 *
 * @param {string} email - The email of the user to log in.
 * @param {string} password - The password of the user to log in.
 * @returns {Promise<string>} - A promise that resolves to the generated JWT token.
 * @throws {Error} - Throws an error if the email or password is invalid.
 */
export const loginUser = async (
  email: string,
  password: string,
): Promise<string> => {
  //  Find the user with the given email
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  //  Compare the password with the hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  //  Generate a JWT token for the user
  const token = generateToken({ userId: user.id, email: user.email });

  console.log(`Generated JWT for login: ${token}`);
  return token;
};
