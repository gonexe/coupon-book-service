import * as couponRepository from '../../../repositories/couponRepository';
import * as couponService from '../../couponService';
import Coupon from '../../../models/coupon';

jest.mock('../../../repositories/couponRepository');

describe('Coupon Service', () => {
  describe('getUserAssignedCoupons', () => {
    it('should return the coupons assigned to the user', async () => {
      const userId = 1;
      const mockCoupons = [
        { id: 1, code: 'COUPON1', assigned_to_user_id: userId },
        { id: 2, code: 'COUPON2', assigned_to_user_id: userId },
      ] as Coupon[];

      (couponRepository.findCouponsByUserId as jest.Mock).mockResolvedValue(
        mockCoupons,
      );

      const coupons = await couponService.getUserAssignedCoupons(userId);

      console.log(
        'Test Case: should return the coupons assigned to the user. Input Data:',
        { userId, coupons, mockCoupons },
      );

      expect(coupons).toEqual(mockCoupons);
      expect(couponRepository.findCouponsByUserId).toHaveBeenCalledWith(userId);
    });

    it('should return an empty array if no coupons are assigned to the user', async () => {
      const userId = 1;
      const mockCoupons: Coupon[] = [];

      (couponRepository.findCouponsByUserId as jest.Mock).mockResolvedValue(
        mockCoupons,
      );

      const coupons = await couponService.getUserAssignedCoupons(userId);

      console.log(
        'Test Case: should return an empty array if no coupons are assigned to the user. Input Data:',
        { userId, coupons, mockCoupons },
      );

      expect(coupons).toEqual(mockCoupons);
      expect(couponRepository.findCouponsByUserId).toHaveBeenCalledWith(userId);
    });

    it('should not return coupons assigned to other users', async () => {
      const userId = 1;
      const otherUserId = 2;
      const mockCoupons = [
        { id: 1, code: 'COUPON1', assigned_to_user_id: userId },
        { id: 2, code: 'COUPON2', assigned_to_user_id: userId },
        { id: 3, code: 'COUPON3', assigned_to_user_id: otherUserId },
      ] as Coupon[];

      (couponRepository.findCouponsByUserId as jest.Mock).mockImplementation(
        (id) => {
          return mockCoupons.filter(
            (coupon) => coupon.assigned_to_user_id === id,
          );
        },
      );

      const coupons = await couponService.getUserAssignedCoupons(userId);

      console.log(
        'Test Case: should not return coupons assigned to other users. Input Data:',
        { userId, coupons, mockCoupons },
      );

      expect(coupons).toEqual([
        { id: 1, code: 'COUPON1', assigned_to_user_id: userId },
        { id: 2, code: 'COUPON2', assigned_to_user_id: userId },
      ]);
      expect(couponRepository.findCouponsByUserId).toHaveBeenCalledWith(userId);
    });
  });
});
