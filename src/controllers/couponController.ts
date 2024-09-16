import { NextFunction, Response } from 'express';
import * as couponService from '../services/couponService';
import { extractAndValidateUserId } from '../utils/authUtils';
import { AuthRequest } from '../types/authRequest';

/**
 * Controller function to assign a coupon to a user.
 *
 * @param {AuthRequest} req - Express request object with user payload.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Returns a JSON response with the assigned coupon or an error.
 */
export const assignCoupon = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  //  Validate and extract the user ID from the request
  const userId = extractAndValidateUserId(req, res);
  if (!userId) return;

  // Extract the coupon book ID from the request body
  const { couponBookId }: { couponBookId: number } = req.body;

  // Assign the coupon to the user
  try {
    const availableCoupon = await couponService.assignCouponToUser(
      couponBookId,
      userId,
    );
    res.status(200).json(availableCoupon);
  } catch (err) {
    next(err);
  }
};

/**
 * Controller function to assign a specific coupon to a user.
 *
 * @param {AuthRequest} req - Express request object with user payload.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Returns a JSON response with the assigned coupon or an error.
 */
export const assignSpecificCoupon = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  //  Validate and extract the user ID from the request
  const userId = extractAndValidateUserId(req, res);
  if (!userId) return;

  // Extract the coupon code from the request parameters
  const { code } = req.params;

  // Assign the specific coupon to the user
  try {
    const assignedCoupon = await couponService.assignSpecificCouponToUser(
      code,
      userId,
    );
    res.status(200).json(assignedCoupon);
  } catch (err) {
    next(err);
  }
};

/**
 * Controller function to lock a coupon for redemption.
 *
 * @param {AuthRequest} req - Express request object with user payload.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Returns a JSON response with a success message or an error.
 */
export const lockCoupon = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  // Extract the coupon code from the request parameters
  const { code } = req.params;

  // Lock the coupon for redemption
  try {
    await couponService.lockCouponForRedemption(code);
    res.status(200).json({ message: 'Coupon locked for redemption' });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller function to redeem a coupon for a user.
 *
 * @param {AuthRequest} req - Express request object with user payload.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Returns a JSON response with the redeemed coupon or an error.
 */
export const redeemCoupon = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  //  Extract the coupon code from the request parameters
  const { code } = req.params;

  // Redeem the coupon for the user
  try {
    const coupon = await couponService.redeemCouponForUser(code);
    res.status(200).json({ message: 'Coupon redeemed successfully', coupon });
  } catch (err) {
    next(err);
  }
};

/**
 * Controller function to get all coupons assigned to a user.
 *
 * @param {AuthRequest} req - Express request object with user payload.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Returns a JSON response with the user's assigned coupons or an error.
 */
export const getUserAssignedCoupons = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  //  Validate and extract the user ID from the request
  const userId = extractAndValidateUserId(req, res);
  if (!userId) return;

  // Get all coupons assigned to the user
  try {
    const coupons = await couponService.getUserAssignedCoupons(userId);
    res.status(200).json(coupons);
  } catch (err) {
    next(err);
  }
};
