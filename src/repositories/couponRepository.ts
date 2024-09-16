import Coupon from '../models/coupon';
import { Op } from 'sequelize';

/**
 * Finds an available coupon for a specific coupon book.
 *
 * @param {number} couponBookId - The ID of the coupon book.
 * @returns {Promise<Coupon | null>} - A promise that resolves to the found coupon or null if no coupon is available.
 */
export const findAvailableCoupon = async (
  couponBookId: number,
): Promise<Coupon | null> => {
  return await Coupon.findOne({
    where: {
      coupon_book_id: couponBookId,
      assigned_to_user_id: {
        [Op.is]: null,
      },
    },
  });
};

/**
 * Finds a coupon by its code.
 *
 * @param {string} code - The code of the coupon to find.
 * @returns {Promise<Coupon | null>} - A promise that resolves to the found coupon or null if no coupon is found.
 */
export const findCouponByCode = async (
  code: string,
): Promise<Coupon | null> => {
  return await Coupon.findOne({ where: { code } });
};

/**
 * Saves a coupon to the database.
 *
 * @param {Coupon} coupon - The coupon to save.
 * @returns {Promise<void>} - A promise that resolves when the coupon is saved.
 */
export const saveCoupon = async (coupon: Coupon): Promise<void> => {
  await coupon.save();
};

/**
 * Assigns a coupon to a user.
 *
 * @param {Coupon} coupon - The coupon to assign.
 * @param {number} userId - The ID of the user to assign the coupon to.
 * @returns {Promise<void>} - A promise that resolves when the coupon is assigned.
 */
export const assignCouponToUser = async (
  coupon: Coupon,
  userId: number,
): Promise<void> => {
  coupon.assigned_to_user_id = userId;
};

/**
 * Checks if a coupon is assigned to a user.
 *
 * @param {Coupon} coupon - The coupon to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the coupon is assigned, false otherwise.
 */
export const isCouponAssigned = async (coupon: Coupon): Promise<boolean> => {
  return !!coupon.assigned_to_user_id;
};

/**
 * Redeems a coupon.
 *
 * @param {Coupon} coupon - The coupon to redeem.
 * @returns {Promise<void>} - A promise that resolves when the coupon is redeemed.
 */
export const redeemCoupon = async (coupon: Coupon): Promise<void> => {
  coupon.is_redeemed = true;
};

/**
 * Checks if a coupon is redeemed.
 *
 * @param {Coupon} coupon - The coupon to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the coupon is redeemed, false otherwise.
 */
export const isCouponRedeemed = async (coupon: Coupon): Promise<boolean> => {
  return coupon.is_redeemed;
};

/**
 * Finds all coupons assigned to a specific user.
 *
 * @param {number} userId - The ID of the user whose coupons to find.
 * @returns {Promise<Coupon[]>} - A promise that resolves to an array of coupons assigned to the user.
 */
export const findCouponsByUserId = async (
  userId: number,
): Promise<Coupon[]> => {
  return await Coupon.findAll({
    where: {
      assigned_to_user_id: userId,
    },
  });
};
