import { assignCouponToUser } from '../../couponService';
import * as couponRepository from '../../../repositories/couponRepository';
import Coupon from '../../../models/coupon';

jest.mock('../../../repositories/couponRepository');

describe('Coupon Service - assignCouponToUser', () => {
  const mockCouponBookId = 1;
  const mockUserId = 123;
  const mockCoupon = {
    id: 1,
    code: 'TESTCOUPON',
    is_redeemed: false,
    assigned_to_user_id: null,
  } as unknown as Coupon;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should assign an available coupon to a user', async () => {
    (couponRepository.findAvailableCoupon as jest.Mock).mockResolvedValue(
      mockCoupon,
    );
    (couponRepository.assignCouponToUser as jest.Mock).mockImplementation(
      (coupon, userId) => {
        coupon.assigned_to_user_id = userId;
      },
    );
    (couponRepository.saveCoupon as jest.Mock).mockResolvedValue(undefined);

    const result = await assignCouponToUser(mockCouponBookId, mockUserId);

    console.log(
      'Test Case: should assign an available coupon to a user. Input Data:',
      { mockCouponBookId, mockUserId, result },
    );

    expect(result).toEqual(mockCoupon);
    expect(result.assigned_to_user_id).toBe(mockUserId);
    expect(couponRepository.findAvailableCoupon).toHaveBeenCalledWith(
      mockCouponBookId,
    );
    expect(couponRepository.assignCouponToUser).toHaveBeenCalledWith(
      mockCoupon,
      mockUserId,
    );
    expect(couponRepository.saveCoupon).toHaveBeenCalledWith(mockCoupon);
  });

  it('should throw an error if no available coupons are found', async () => {
    (couponRepository.findAvailableCoupon as jest.Mock).mockResolvedValue(null);

    try {
      await assignCouponToUser(mockCouponBookId, mockUserId);
    } catch (error) {
      console.log(
        'Test Case: should throw an error if no available coupons are found. Input Data:',
        { mockCouponBookId, mockUserId },
      );

      expect((error as Error).message).toBe('No available coupons found');
    }
  });
});
