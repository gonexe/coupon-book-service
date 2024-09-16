import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { validateConnections } from './config/connections';
import couponBookRoutes from './routes/couponBookRoutes';
import couponRoutes from './routes/couponRoutes';

dotenv.config();

const app = express();

// Use CORS middleware
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.use(express.json());

// Validate connections
validateConnections()
  .then(() => {
    console.log('All connections validated successfully.');
  })
  .catch((err) => {
    console.error('Error during connection validation:', err);
    process.exit(1);
  });

// Mount routes
app.use('/coupons', couponRoutes);
app.use('/couponBooks', couponBookRoutes);

export default app;
