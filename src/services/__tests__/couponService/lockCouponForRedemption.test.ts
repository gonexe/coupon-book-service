import { lockCouponForRedemption } from '../../couponService';
import * as couponRepository from '../../../repositories/couponRepository';
import * as redisUtil from '../../../utils/redisUtil';
import Coupon from '../../../models/coupon';

jest.mock('../../../repositories/couponRepository');
jest.mock('../../../utils/redisUtil');

describe('Coupon Service - lockCouponForRedemption', () => {
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

  it('should lock a coupon for redemption', async () => {
    (couponRepository.findCouponByCode as jest.Mock).mockResolvedValue(
      mockCoupon,
    );
    (couponRepository.isCouponAssigned as jest.Mock).mockResolvedValue(true);
    (redisUtil.getRedisValue as jest.Mock).mockResolvedValue(null);
    (redisUtil.setRedisValue as jest.Mock).mockResolvedValue(undefined);

    await lockCouponForRedemption(mockCouponCode);

    console.log('Test Case: should lock a coupon for redemption. Input Data:', {
      mockCouponCode,
      mockCoupon,
      isCouponAssigned: await couponRepository.isCouponAssigned(mockCoupon),
      redisLockValue: await redisUtil.getRedisValue(
        `coupon:${mockCouponCode}:lock`,
      ),
    });

    expect(couponRepository.findCouponByCode).toHaveBeenCalledWith(
      mockCouponCode,
    );
    expect(couponRepository.isCouponAssigned).toHaveBeenCalledWith(mockCoupon);
    expect(redisUtil.getRedisValue).toHaveBeenCalledWith(
      `coupon:${mockCouponCode}:lock`,
    );
    expect(redisUtil.setRedisValue).toHaveBeenCalledWith(
      `coupon:${mockCouponCode}:lock`,
      '1',
      60,
    );
  });

  it('should throw an error if the coupon is not found', async () => {
    (couponRepository.findCouponByCode as jest.Mock).mockResolvedValue(null);

    await expect(lockCouponForRedemption(mockCouponCode)).rejects.toThrow(
      'Coupon not found',
    );
  });

  it('should throw an error if the coupon is not assigned to a user', async () => {
    (couponRepository.findCouponByCode as jest.Mock).mockResolvedValue(
      mockCoupon,
    );
    (couponRepository.isCouponAssigned as jest.Mock).mockResolvedValue(false);

    await expect(lockCouponForRedemption(mockCouponCode)).rejects.toThrow(
      'Coupon has not been assigned to a user',
    );
  });

  it('should throw an error if the coupon is already locked', async () => {
    (couponRepository.findCouponByCode as jest.Mock).mockResolvedValue(
      mockCoupon,
    );
    (couponRepository.isCouponAssigned as jest.Mock).mockResolvedValue(true);
    (redisUtil.getRedisValue as jest.Mock).mockResolvedValue('1'); // Simulate coupon already locked

    await expect(lockCouponForRedemption(mockCouponCode)).rejects.toThrow(
      'Coupon is already locked',
    );

    console.log(
      'Test Case: should throw an error if the coupon is already locked. Input Data:',
      {
        mockCouponCode,
        mockCoupon,
        isCouponAssigned: await couponRepository.isCouponAssigned(mockCoupon),
        redisLockValue: await redisUtil.getRedisValue(
          `coupon:${mockCouponCode}:lock`,
        ),
      },
    );
  });
});
