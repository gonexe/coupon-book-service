import { Sequelize } from 'sequelize';
import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

//  Check if the DATABASE_URL environment variable is defined
const databaseURL = process.env.DATABASE_URL;
if (!databaseURL) {
  throw new Error('DATABASE_URL environment variable is not defined');
}

//  Create a new Sequelize instance
const sequelize = new Sequelize(databaseURL, {
  dialect: 'postgres',
  logging: false,
});

const redisClient = new Redis({
  //  Check if the REDIS_HOST, REDIS_PORT, and REDIS_PASSWORD environment variables are defined
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});

//  Message that is logged when the Redis connection is established successfully
redisClient.on('ready', () => {
  console.log('Redis connection has been established successfully.');
});

//  Message that is logged when the Redis connection encounters an error
redisClient.on('error', (err: Error) => {
  console.error('Redis connection error:', err);
});

export { sequelize, redisClient };
