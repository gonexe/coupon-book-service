import { body } from 'express-validator';

/**
 * Middleware to validate the email field in a request.
 * Ensures that the email field contains a valid email address.
 *
 * @returns {ValidationChain} - The validation chain for the email field.
 */
export const emailValidation = body('email')
  .isEmail()
  .withMessage('Please provide a valid email');

/**
 * Middleware to validate the password field in a request.
 * Ensures that the password field is at least 6 characters long.
 *
 * @returns {ValidationChain} - The validation chain for the password field.
 */
export const passwordValidation = body('password')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters');
