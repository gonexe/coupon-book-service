import { uploadCouponCodes } from '../../couponBookService';
import * as couponBookRepository from '../../../repositories/couponBookRepository';

jest.mock('../../../repositories/couponBookRepository');

describe('Coupon Service - uploadCouponCodes', () => {
  const mockCouponBookId = 1;
  const mockCodes = ['CODE1', 'CODE2', 'CODE3'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should upload coupon codes to an existing coupon book', async () => {
    (couponBookRepository.uploadCouponCodes as jest.Mock).mockResolvedValue(
      true,
    );

    const result = await uploadCouponCodes(mockCouponBookId, mockCodes);

    console.log(
      'Test Case: should upload coupon codes to an existing coupon book. Input Data:',
      { mockCouponBookId, mockCodes },
    );

    expect(result).toBe(true);
    expect(couponBookRepository.uploadCouponCodes).toHaveBeenCalledWith(
      mockCouponBookId,
      mockCodes,
    );
  });

  it('should throw an error if coupon book ID is not provided', async () => {
    try {
      await uploadCouponCodes(0, mockCodes);
    } catch (error) {
      console.log(
        'Test Case: should throw an error if coupon book ID is not provided. Input Data:',
        {
          couponBookId: 0,
          mockCodes,
        },
      );

      expect((error as Error).message).toBe('Coupon book ID is required');
    }
  });

  it('should throw an error if codes list is not provided', async () => {
    try {
      await uploadCouponCodes(mockCouponBookId, []);
    } catch (error) {
      console.log(
        'Test Case: should throw an error if codes list is not provided. Input Data:',
        { mockCouponBookId, codes: [] },
      );

      expect((error as Error).message).toBe(
        'A list of coupon codes is required',
      );
    }
  });

  it('should throw an error if codes list is not an array', async () => {
    const invalidCodes: unknown = null;
    try {
      await uploadCouponCodes(mockCouponBookId, invalidCodes as string[]);
    } catch (error) {
      console.log(
        'Test Case: should throw an error if codes list is not an array. Input Data:',
        {
          mockCouponBookId,
          codes: invalidCodes,
        },
      );

      expect((error as Error).message).toBe(
        'A list of coupon codes is required',
      );
    }
  });
});
