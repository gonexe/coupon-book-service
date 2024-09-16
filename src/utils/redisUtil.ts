import { redisClient } from '../config/config';

/**
 * Retrieves a value from Redis by key.
 *
 * @param {string} key - The key of the value to retrieve.
 * @returns {Promise<string | null>} - A promise that resolves to the value associated with the key, or null if the key does not exist.
 */
export const getRedisValue = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};

/**
 * Sets a value in Redis with an expiration time.
 *
 * @param {string} key - The key of the value to set.
 * @param {string} value - The value to set.
 * @param {number} expiry - The expiration time in seconds.
 * @returns {Promise<void>} - A promise that resolves when the value is set.
 */
export const setRedisValue = async (
  key: string,
  value: string,
  expiry: number,
): Promise<void> => {
  await redisClient.set(key, value, 'EX', expiry);
};

/**
 * Deletes a value from Redis by key.
 *
 * @param {string} key - The key of the value to delete.
 * @returns {Promise<void>} - A promise that resolves when the value is deleted.
 */
export const deleteRedisValue = async (key: string): Promise<void> => {
  await redisClient.del(key);
};
