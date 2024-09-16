import request from 'supertest';
import express from 'express';
import { login, register } from '../../../controllers/authController';
import {
  emailValidation,
  passwordValidation,
} from '../../../validators/authValidators';
import { logger } from '../../../middleware/logger';
import { deleteUserByEmailTestingPurpose } from '../../../repositories/authRepository';

const app = express();
app.use(express.json());
app.use(logger);
app.post('/register', [emailValidation, passwordValidation], register);
app.post('/login', [emailValidation, passwordValidation], login);

describe('POST /login', () => {
  afterAll(async () => {
    await deleteUserByEmailTestingPurpose('test@example.com');
  });

  it('should log in an existing user and return a token', async () => {
    // First, register a user
    await request(app)
      .post('/register')
      .send({ email: 'test@example.com', password: 'Password123!' });

    // Then, log in the user
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'Password123!' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 400 if validation fails', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'invalid-email', password: 'short' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });

  it('should return 401 if login credentials are incorrect', async () => {
    const response = await request(app)
      .post('/login')
      .send({ email: 'test@example.com', password: 'WrongPassword!' });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'Invalid credentials');
  });
});
