import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { loginUser, registerUser } from '../services/authService';

/**
 * Controller function to handle user registration.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} - Returns a JSON response with a token or an error message.
 */
export const register = async (req: Request, res: Response) => {
  //  Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //  Extract email and password from request body
  const { email, password }: { email: string; password: string } = req.body;

  //  Call registerUser function from authService
  try {
    const token = await registerUser(email, password);
    res.status(201).json({ token });
  } catch (err) {
    console.error('Error in register controller:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/**
 * Controller function to handle user login.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<Response>} - Returns a JSON response with a token or an error message.
 */
export const login = async (req: Request, res: Response) => {
  //  Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //  Extract email and password from request body
  const { email, password }: { email: string; password: string } = req.body;

  //  Call loginUser function from authService
  try {
    const token = await loginUser(email, password);
    res.json({ token });
  } catch (err) {
    if (
      err instanceof Error &&
      err.message.includes('Invalid email or password')
    ) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    console.error('Error in login controller:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
