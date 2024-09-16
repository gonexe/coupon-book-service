import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/userPayload';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

/**
 * Generates a JWT token for a given user payload.
 *
 * @param {UserPayload} payload - The payload containing user information.
 * @returns {string} - The generated JWT token.
 */
export const generateToken = (payload: UserPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
};
