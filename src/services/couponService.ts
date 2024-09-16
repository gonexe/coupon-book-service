import * as couponRepository from '../repositories/couponRepository';
import * as redisUtil from '../utils/redisUtil';
import Coupon from '../models/coupon';

/**
 * Assigns an available coupon from a specific coupon book to a user.
 *
 * @param {number} couponBookId - The ID of the coupon book.
 * @param {number} userId - The ID of the user to assign the coupon to.
 * @returns {Promise<Coupon>} - A promise that resolves to the assigned coupon.
 * @throws {Error} - Throws an error if no available coupons are found.
 */
export const assignCouponToUser = async (
  couponBookId: number,
  userId: number,
): Promise<Coupon> => {
  // Find an available coupon from the coupon book
  const availableCoupon: Coupon | null =
    await couponRepository.findAvailableCoupon(couponBookId);

  // Throw an error if no available coupons are found
  if (!availableCoupon) {
    throw new Error('No available coupons found');
  }

  //  Assign the coupon to the user and save the coupon
  await couponRepository.assignCouponToUser(availableCoupon, userId);
  await couponRepository.saveCoupon(availableCoupon);

  // Return the assigned coupon
  return availableCoupon;
};

/**
 * Assigns a specific coupon to a user.
 *
 * @param {string} code - The code of the coupon to assign.
 * @param {number} userId - The ID of the user to assign the coupon to.
 * @returns {Promise<Coupon>} - A promise that resolves to the assigned coupon.
 * @throws {Error} - Throws an error if the coupon is not found or already assigned.
 */
export const assignSpecificCouponToUser = async (
  code: string,
  userId: number,
): Promise<Coupon> => {
  // Find the coupon by code
  const coupon: Coupon | null = await couponRepository.findCouponByCode(code);

  // Throw an error if the coupon is not found or already assigned
  if (!coupon) {
    throw new Error('Coupon not found or already assigned');
  }

  // Assign the coupon to the user and save the coupon
  await couponRepository.assignCouponToUser(coupon, userId);
  await couponRepository.saveCoupon(coupon);

  // Return the assigned coupon
  return coupon;
};

/**
 * Locks a coupon for redemption.
 *
 * @param {string} code - The code of the coupon to lock.
 * @returns {Promise<void>} - A promise that resolves when the coupon is locked.
 * @throws {Error} - Throws an error if the coupon is not found, not assigned, or already locked.
 */
export const lockCouponForRedemption = async (code: string): Promise<void> => {
  //  Find the coupon by code
  const coupon: Coupon | null = await couponRepository.findCouponByCode(code);

  // Throw an error if the coupon is not found
  if (!coupon) {
    throw new Error('Coupon not found');
  }

  // Throw an error if the coupon has not been assigned to a user
  if (!(await couponRepository.isCouponAssigned(coupon))) {
    throw new Error('Coupon has not been assigned to a user');
  }

  // Check if the coupon is already locked
  const isLocked = await redisUtil.getRedisValue(`coupon:${code}:lock`);
  if (isLocked) {
    throw new Error('Coupon is already locked');
  }

  // Lock the coupon for redemption
  await redisUtil.setRedisValue(`coupon:${code}:lock`, '1', 60);
};

/**
 * Redeems a coupon for a user.
 *
 * @param {string} code - The code of the coupon to redeem.
 * @returns {Promise<Coupon>} - A promise that resolves to the redeemed coupon.
 * @throws {Error} - Throws an error if the coupon is not locked, not found, or already redeemed.
 */
export const redeemCouponForUser = async (code: string): Promise<Coupon> => {
  // Check if the coupon is locked
  const isLocked = await redisUtil.getRedisValue(`coupon:${code}:lock`);

  // Throw an error if the coupon is not locked
  if (!isLocked) {
    throw new Error('Coupon is not locked for redemption');
  }

  //  Find the coupon by code
  const coupon: Coupon | null = await couponRepository.findCouponByCode(code);

  // Throw an error if the coupon is not found
  if (!coupon) {
    throw new Error('Coupon not found');
  }

  // Throw an error if the coupon has already been redeemed
  if (await couponRepository.isCouponRedeemed(coupon)) {
    throw new Error('Coupon has already been redeemed');
  }

  // Redeem the coupon and save the coupon
  await couponRepository.redeemCoupon(coupon);
  await couponRepository.saveCoupon(coupon);

  // Delete the lock for the coupon
  await redisUtil.deleteRedisValue(`coupon:${code}:lock`);

  // Return the redeemed coupon
  return coupon;
};

/**
 * Retrieves all coupons assigned to a specific user.
 *
 * @param {number} userId - The ID of the user whose coupons to retrieve.
 * @returns {Promise<Coupon[]>} - A promise that resolves to an array of coupons assigned to the user.
 */
export const getUserAssignedCoupons = async (
  userId: number,
): Promise<Coupon[]> => {
  return await couponRepository.findCouponsByUserId(userId);
};
