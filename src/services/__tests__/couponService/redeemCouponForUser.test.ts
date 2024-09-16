import { redeemCouponForUser } from '../../couponService';
import * as couponRepository from '../../../repositories/couponRepository';
import * as redisUtil from '../../../utils/redisUtil';
import Coupon from '../../../models/coupon';

jest.mock('../../../repositories/couponRepository');
jest.mock('../../../utils/redisUtil');

describe('Coupon Service - redeemCouponForUser', () => {
  const mockCouponCode = 'SPECIFICCOUPON';
  const mockCoupon = {
    id: 1,
    code: mockCouponCode,
    is_redeemed: false,
    assigned_to_user_id: 123,
  } as unknown as Coupon;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should redeem a coupon for a user', async () => {
    (redisUtil.getRedisValue as jest.Mock).mockResolvedValue('1');
    (couponRepository.findCouponByCode as jest.Mock).mockResolvedValue(
      mockCoupon,
    );
    (couponRepository.isCouponRedeemed as jest.Mock).mockResolvedValue(false);
    (couponRepository.redeemCoupon as jest.Mock).mockResolvedValue(undefined);
    (redisUtil.deleteRedisValue as jest.Mock).mockResolvedValue(undefined);

    const result = await redeemCouponForUser(mockCouponCode);

    console.log('Test Case: should redeem a coupon for a user. Input Data:', {
      mockCouponCode,
      mockCoupon,
      isLocked: await redisUtil.getRedisValue(`coupon:${mockCouponCode}:lock`),
      isRedeemed: await couponRepository.isCouponRedeemed(mockCoupon),
    });

    expect(redisUtil.getRedisValue).toHaveBeenCalledWith(
      `coupon:${mockCouponCode}:lock`,
    );
    expect(couponRepository.findCouponByCode).toHaveBeenCalledWith(
      mockCouponCode,
    );
    expect(couponRepository.isCouponRedeemed).toHaveBeenCalledWith(mockCoupon);
    expect(couponRepository.redeemCoupon).toHaveBeenCalledWith(mockCoupon);
    expect(redisUtil.deleteRedisValue).toHaveBeenCalledWith(
      `coupon:${mockCouponCode}:lock`,
    );
    expect(result).toEqual(mockCoupon);
  });

  it('should throw an error if the coupon is not locked for redemption', async () => {
    (redisUtil.getRedisValue as jest.Mock).mockResolvedValue(null);

    await expect(redeemCouponForUser(mockCouponCode)).rejects.toThrow(
      'Coupon is not locked for redemption',
    );
  });

  it('should throw an error if the coupon is not found', async () => {
    (redisUtil.getRedisValue as jest.Mock).mockResolvedValue('1');
    (couponRepository.findCouponByCode as jest.Mock).mockResolvedValue(null);

    await expect(redeemCouponForUser(mockCouponCode)).rejects.toThrow(
      'Coupon not found',
    );
  });

  it('should throw an error if the coupon has already been redeemed', async () => {
    (redisUtil.getRedisValue as jest.Mock).mockResolvedValue('1');
    (couponRepository.findCouponByCode as jest.Mock).mockResolvedValue(
      mockCoupon,
    );
    (couponRepository.isCouponRedeemed as jest.Mock).mockResolvedValue(true);

    await expect(redeemCouponForUser(mockCouponCode)).rejects.toThrow(
      'Coupon has already been redeemed',
    );
    expect(couponRepository.redeemCoupon).not.toHaveBeenCalled();
  });
});
