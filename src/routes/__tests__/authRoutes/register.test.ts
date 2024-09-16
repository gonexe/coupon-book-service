import request from 'supertest';
import express from 'express';
import { register } from '../../../controllers/authController';
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

describe('POST /register', () => {
  afterEach(async () => {
    await deleteUserByEmailTestingPurpose('test@example.com');
  });
  it('should register a new user and return a token', async () => {
    const response = await request(app)
      .post('/register')
      .send({ email: 'test@example.com', password: 'Password123!' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should return 400 if validation fails', async () => {
    const response = await request(app)
      .post('/register')
      .send({ email: 'invalid-email', password: 'short' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
});
