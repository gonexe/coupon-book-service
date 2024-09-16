import CouponBook from '../models/couponBook';
import Coupon from '../models/coupon';
import { CouponBookData } from '../types/couponBookTypes';

/**
 * Creates a new coupon book in the database.
 *
 * @param {CouponBookData} data - The data for the new coupon book.
 * @returns {Promise<CouponBook>} - A promise that resolves to the created coupon book.
 */
export const createCouponBook = async (
  data: CouponBookData,
): Promise<CouponBook> => {
  return await CouponBook.create(data);
};

/**
 * Uploads multiple coupon codes for a specific coupon book.
 *
 * @param {number} couponBookId - The ID of the coupon book.
 * @param {string[]} codes - An array of coupon codes to upload.
 * @returns {Promise<Coupon[]>} - A promise that resolves to the created coupons.
 */
export const uploadCouponCodes = async (
  couponBookId: number,
  codes: string[],
): Promise<Coupon[]> => {
  const coupons = codes.map((code) => ({
    code,
    coupon_book_id: couponBookId,
    is_redeemed: false,
  }));

  return await Coupon.bulkCreate(coupons);
};
