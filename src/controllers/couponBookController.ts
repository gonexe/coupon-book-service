import { NextFunction, Request, Response } from 'express';
import * as couponBookService from '../services/couponBookService';

/**
 * Controller function to create a new coupon book.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Returns a JSON response with the created coupon book or an error.
 */
export const createCouponBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const couponBook = await couponBookService.createCouponBook(req.body);
    res.status(201).json(couponBook);
  } catch (err) {
    next(err);
  }
};

/**
 * Controller function to upload coupon codes to a coupon book.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Returns a JSON response with a success message or an error.
 */
export const uploadCouponCodes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { couponBookId, codes } = req.body;
    await couponBookService.uploadCouponCodes(couponBookId, codes);
    res.status(200).json({ message: 'Coupon codes uploaded successfully' });
  } catch (err) {
    next(err);
  }
};
