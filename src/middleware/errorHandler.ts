import { Request, Response } from 'express';

/**
 * Middleware function to handle errors.
 *
 * @param {Error} err - The error object.
 * @param {Request} _req - Express request object (unused).
 * @param {Response} res - Express response object.
 * @returns {void} - Returns a JSON response with the error message and a 500 status code.
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
): void => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
};
