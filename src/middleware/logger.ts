import { NextFunction, Request, Response } from 'express';

/**
 * Middleware function to log HTTP requests.
 *
 * @param {Request} req - Express request object.
 * @param {Response} _res - Express response object (unused).
 * @param {NextFunction} next - Express next middleware function.
 * @returns {void} - Logs the HTTP method and URL, then calls the next middleware.
 */
export const logger = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  console.log(`${req.method} ${req.url}`);
  next();
};
