import express, { Request, Response } from 'express';
import { login, register } from '../controllers/authController';
import { logger } from '../middleware/logger';
import {
  emailValidation,
  passwordValidation,
} from '../validators/authValidators';

const router = express.Router();

// Apply the logger middleware to all routes
router.use(logger);

// Registration Route
router.post('/register', [emailValidation, passwordValidation], register);

// Login Route
router.post('/login', [emailValidation, passwordValidation], login);

// Error Handling Middleware
router.use((err: unknown, _req: Request, res: Response) => {
  if (err instanceof Error) {
    res.status(500).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'An unknown error occurred' });
  }
});
