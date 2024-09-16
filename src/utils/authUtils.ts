import { Response } from 'express';
import { AuthRequest } from '../types/authRequest';

/**
 * Utility function to extract and validate user ID from the request.
 *
 * @param {AuthRequest} req - Express request object with user payload.
 * @param {Response} res - Express response object.
 * @returns {number | null} - Returns the user ID if valid, otherwise sends a 401 response and returns null.
 */
export const extractAndValidateUserId = (
  req: AuthRequest,
  res: Response,
): number | null => {
  //  Extract user ID from the request object
  const userId = req.user?.userId ?? null;

  //  If no user ID found, send a 401 response
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized: No user ID found' });
    return null;
  }

  //  Return the user ID
  return userId;
};
