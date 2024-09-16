import { createCouponBook } from '../../couponBookService';
import CouponBook from '../../../models/couponBook';

describe('Coupon Service', () => {
  describe('createCouponBook', () => {
    it('should create a new coupon book', async () => {
      const newCouponBook = {
        name: 'Holiday Special',
        max_uses_per_user: 1,
        is_redeemable_multiple_times: false,
      };

      const createdCouponBook: CouponBook =
        await createCouponBook(newCouponBook);
      const fetchedCouponBook: CouponBook | null = await CouponBook.findByPk(
        createdCouponBook.id,
      );

      console.log(
        'Test Case: should create a new coupon book. Input Data:',
        newCouponBook,
        'Actual:',
        fetchedCouponBook,
      );

      expect(fetchedCouponBook).not.toBeNull();
      expect(fetchedCouponBook!.name).toBe(newCouponBook.name);
      expect(fetchedCouponBook!.max_uses_per_user).toBe(
        newCouponBook.max_uses_per_user,
      );
      expect(fetchedCouponBook!.is_redeemable_multiple_times).toBe(
        newCouponBook.is_redeemable_multiple_times,
      );
    });

    it('should throw an error if name is missing', async () => {
      const newCouponBook = {
        name: '',
        max_uses_per_user: 1,
        is_redeemable_multiple_times: false,
      };

      console.log(
        'Test Case: should throw an error if name is missing. Input Data:',
        newCouponBook,
      );

      await expect(createCouponBook(newCouponBook)).rejects.toThrow(
        'Coupon book name is required',
      );
    });

    it('should throw an error if max_uses_per_user is less than 1', async () => {
      const newCouponBook = {
        name: 'Holiday Special',
        max_uses_per_user: 0,
        is_redeemable_multiple_times: false,
      };

      console.log(
        'Test Case: should throw an error if max_uses_per_user is less than 1. Input Data:',
        newCouponBook,
      );

      await expect(createCouponBook(newCouponBook)).rejects.toThrow(
        'Max uses per user must be at least 1',
      );
    });

    it('should throw an error if name exceeds maximum length', async () => {
      const newCouponBook = {
        name: 'A'.repeat(256), // Assuming the max length is 255 characters
        max_uses_per_user: 1,
        is_redeemable_multiple_times: false,
      };

      console.log(
        'Test Case: should throw an error if name exceeds maximum length. Input Data:',
        newCouponBook,
      );

      await expect(createCouponBook(newCouponBook)).rejects.toThrow(
        'value too long for type character varying(255)',
      );
    });
  });
});
