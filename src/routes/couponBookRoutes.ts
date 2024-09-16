import express from 'express';
import { authenticateJWT } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validationMiddleware';
import { errorHandler } from '../middleware/errorHandler';
import {
  createCouponBook,
  uploadCouponCodes,
} from '../controllers/couponBookController';
import { logger } from '../middleware/logger';

const router = express.Router();

//  Apply the logger middleware to all routes
router.use(logger);

//  Create Coupon Book Route
router.post('/create', authenticateJWT, validateRequest, createCouponBook);

//  Upload Coupon Codes Route
router.post(
  '/upload-codes',
  authenticateJWT,
  validateRequest,
  uploadCouponCodes,
);

router.use(errorHandler);

export default router;
