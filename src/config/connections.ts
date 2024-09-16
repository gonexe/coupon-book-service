import { redisClient, sequelize } from './config';

/**
 * Validate connections to PostgreSQL and Redis.
 * @returns {Promise<void>} A promise that resolves when all connections are validated.
 */
export async function validateConnections(): Promise<void> {
  try {
    // Validate PostgreSQL connection
    await sequelize.authenticate();
    console.log('PostgreSQL connection has been established successfully.');

    // Validate Redis connection
    await new Promise((resolve, reject) => {
      redisClient.on('ready', () => {
        console.log('Redis connection is ready.');
        resolve(true);
      });
      redisClient.on('error', (err: Error) => {
        console.error('Redis connection error during validation:', err);
        reject(err);
      });
    });

    // Sync database
    await sequelize.sync();
    console.log('Database synced');
  } catch (err) {
    console.error('Unable to connect to the database or Redis:', err);
    throw err;
  }
}
