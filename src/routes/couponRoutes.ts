import express from 'express';
import {
  assignCoupon,
  assignSpecificCoupon,
  getUserAssignedCoupons,
  lockCoupon,
  redeemCoupon,
} from '../controllers/couponController';
import { authenticateJWT } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validationMiddleware';
import { errorHandler } from '../middleware/errorHandler';
import { logger } from '../middleware/logger';

const router = express.Router();

//  Apply the logger middleware to all routes
router.use(logger);

//  Assign Coupon Route (Assigns a random coupon to a user)
router.post('/assign', authenticateJWT, validateRequest, assignCoupon);

//  Assign Specific Coupon Route
router.post(
  '/assign/:code',
  authenticateJWT,
  validateRequest,
  assignSpecificCoupon,
);

//  Lock Coupon Route
router.post('/lock/:code', authenticateJWT, validateRequest, lockCoupon);

//  Redeem Coupon Route
router.post('/redeem/:code', authenticateJWT, validateRequest, redeemCoupon);

//  Get User Assigned Coupons Route
router.get(
  '/user-coupons',
  authenticateJWT,
  validateRequest,
  getUserAssignedCoupons,
);

router.use(errorHandler);

export default router;
