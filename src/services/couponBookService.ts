import { CouponBookData } from '../types/couponBookTypes';
import * as couponBookRepository from '../repositories/couponBookRepository';
import Coupon from '../models/coupon';
import CouponBook from '../models/couponBook';

/**
 * Creates a new coupon book in the database.
 *
 * @param {CouponBookData} data - The data for the new coupon book.
 * @returns {Promise<CouponBook>} - A promise that resolves to the created coupon book.
 * @throws {Error} - Throws an error if the coupon book name is missing or max uses per user is less than 1.
 */
export const createCouponBook = async (
  data: CouponBookData,
): Promise<CouponBook> => {
  if (!data.name) {
    throw new Error('Coupon book name is required');
  }
  if (data.max_uses_per_user < 1) {
    throw new Error('Max uses per user must be at least 1');
  }

  return await couponBookRepository.createCouponBook(data);
};

/**
 * Uploads multiple coupon codes for a specific coupon book.
 *
 * @param {number} couponBookId - The ID of the coupon book.
 * @param {string[]} codes - An array of coupon codes to upload.
 * @returns {Promise<Coupon[]>} - A promise that resolves to the created coupons.
 * @throws {Error} - Throws an error if the coupon book ID is missing or the list of coupon codes is invalid.
 */
export const uploadCouponCodes = async (
  couponBookId: number,
  codes: string[],
): Promise<Coupon[]> => {
  if (!couponBookId) {
    throw new Error('Coupon book ID is required');
  }
  if (!Array.isArray(codes) || codes.length === 0) {
    throw new Error('A list of coupon codes is required');
  }

  return await couponBookRepository.uploadCouponCodes(couponBookId, codes);
};
