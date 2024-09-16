import { assignSpecificCouponToUser } from '../../couponService';
import * as couponRepository from '../../../repositories/couponRepository';
import Coupon from '../../../models/coupon';

jest.mock('../../../repositories/couponRepository');

describe('Coupon Service - assignSpecificCouponToUser', () => {
  const mockCouponCode = 'SPECIFICCOUPON';
  const mockUserId = 123;
  const mockCoupon = {
    id: 1,
    code: mockCouponCode,
    is_redeemed: false,
    assigned_to_user_id: null,
  } as unknown as Coupon;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should assign a specific coupon to a user', async () => {
    (couponRepository.findCouponByCode as jest.Mock).mockResolvedValue(
      mockCoupon,
    );
    (couponRepository.assignCouponToUser as jest.Mock).mockImplementation(
      (coupon, userId) => {
        coupon.assigned_to_user_id = userId;
      },
    );
    (couponRepository.saveCoupon as jest.Mock).mockResolvedValue(undefined);

    const result = await assignSpecificCouponToUser(mockCouponCode, mockUserId);

    console.log(
      'Test Case: should assign a specific coupon to a user. Input Data:',
      { mockCouponCode, mockUserId, result },
    );

    expect(result).toEqual(mockCoupon);
    expect(result.assigned_to_user_id).toBe(mockUserId);
    expect(couponRepository.findCouponByCode).toHaveBeenCalledWith(
      mockCouponCode,
    );
    expect(couponRepository.assignCouponToUser).toHaveBeenCalledWith(
      mockCoupon,
      mockUserId,
    );
    expect(couponRepository.saveCoupon).toHaveBeenCalledWith(mockCoupon);
  });

  it('should throw an error if the specific coupon is not found', async () => {
    (couponRepository.findCouponByCode as jest.Mock).mockResolvedValue(null);

    try {
      await assignSpecificCouponToUser(mockCouponCode, mockUserId);
    } catch (error) {
      console.log(
        'Test Case: should throw an error if the specific coupon is not found. Input Data:',
        { mockCouponCode, mockUserId },
      );

      expect((error as Error).message).toBe(
        'Coupon not found or already assigned',
      );
    }
  });
});
