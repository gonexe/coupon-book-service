import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/userPayload';
import { AuthRequest } from '../types/authRequest';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

/**
 * Middleware function to authenticate JWT tokens.
 *
 * @param {AuthRequest} req - Express request object with optional user payload.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {void} - Returns a 401 response if the token is missing or invalid, otherwise calls the next middleware.
 */
export const authenticateJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  //  Get the token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1];

  //  Return a 401 response if the token is missing
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  //  Verify the token and call the next middleware
  try {
    req.user = jwt.verify(token, JWT_SECRET) as UserPayload;
    next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
