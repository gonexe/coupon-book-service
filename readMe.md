# Coupon Management System

## Technologies Used

- **Languages**: TypeScript, Express
- **Database**: PostgreSQL (using Sequelize ORM)
- **Package Management**: npm
- **Testing**: Jest (for unit tests)
- **Caching**: Redis (for locking mechanisms)
- **Containerization**: Docker

## Project Setup

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/coupon-management-system.git
    cd coupon-management-system
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the required environment variables (see the Environment Variables
   section).

4. **Run the application**:
    ```sh
    docker-compose up --build
    ```

## Running Tests

To run the tests inside the `app` Docker container, use the following command:

```sh
docker-compose exec app npm test
```

## Environment Variables

```
DATABASE_URL: URL for the PostgreSQL database.
REDIS_URL: URL for the Redis instance.
JWT_SECRET: Secret key for JWT.
```

## Routes

- **`Auth`**:
    - **`POST /api/auth/register`**: User registration.
    - **`POST /api/auth/login`**: User login.


- **`Coupon book:`**
    - **`POST /api/couponBooks/create`**: Create a new coupon book.
    - **`POST /api/couponBooks/upload-codes`**: Upload coupon codes to a coupon book.


- **`Coupon:`**
    - **`POST /api/coupons/assign`**: Assign a coupon to a user.
    - **`POST /api/coupons/assign/:code`**: Assign a specific coupon to a user.
    - **`POST /api/coupons/lock/:code`**: Lock a coupon for redemption.
    - **`POST /api/coupons/redeem/:code`**: Redeem a coupon for a user.
    - **`GET /api/coupons/user-coupons`**: Get all coupons assigned to a user.

## Controllers

- **`authController.ts`**: Handles user registration and login.
    - **`register`**
    - **`login`**


- **`couponBookController.ts`**: Handles coupon book operations.
    - **`createCouponBook`**
    - **`uploadCouponCodes`**


- **`couponController.ts`**: Handles coupon operations.
    - **`assignCoupon`**
    - **`assignSpecificCoupon`**
    - **`lockCoupon`**
    - **`redeemCoupon`**
    - **`getUserAssignedCoupons`**

## Services

- **`authService.ts`**: Handles user registration and login.
    - **`registerUser`**
    - **`loginUser`**


- **`couponBookService.ts`**: Handles coupon book operations.
    - **`createCouponBook `**
    - **`uploadCouponCodes`**


- **`couponService.ts`**: Handles coupon operations.
    - **`assignCouponToUser`**: Assigns a coupon to a user.
    - **`assignSpecificCouponToUser`**: Assigns a specific coupon to a user.
    - **`lockCouponForRedemption`**: Locks a coupon for redemption.
    - **`redeemCouponForUser`**: Redeems a coupon for a user.
    - **`getUserAssignedCoupons`**: Gets all coupons assigned to a user.

## Repositories

- **`authRepository.ts`**: Handles database operations for users.
    - **`createUser`**
    - **`findUserByEmail`**
    - **`deleteUserByEmailTestingPurpose`**: Only for testing purposes. Delete users after testing.


- **`couponBookRepository.ts`**: Handles database operations for coupon books.
    - **`createCouponBook`**
    - **`uploadCouponCodes`**


- **`couponRepository.ts`**: Handles database operations for coupons.
    - **`findAvailableCoupon`**: Finds an available coupon for a user.
    - **`findCouponByCode`**: Finds a coupon by its code.
    - **`saveCoupon`**: Saves a coupon to the database.
    - **`assignCouponToUser`**: Assigns a coupon to a user.
    - **`isCouponAssignedToUser`**: Checks if a coupon is already assigned to a user.
    - **`redeemCoupon`**: Redeems a coupon for a user.
    - **`isCouponRedeemed`**: Checks if a coupon is already redeemed.
    - **`findCouponsByUserId`**: Finds all coupons assigned to a user.

## Middleware

- **`authMiddleware.ts`**: Middleware for handling authentication using JWT.
- **`errorHandler.ts`**: Global error handling
- **`logger.ts`**: Logging incoming requests
- **`validationMiddleware.ts`**: Validating incoming requests

## Models

- **`User`**: Model for users.
- **`CouponBook`**: Model for coupon books.
- **`Coupon`**: Model for coupons.

## Types

- **`authRequest`**: Request object for user registration and login.
- **`couponBookRequest`**: Request object for creating a coupon book.
- **`userPayload`**: Payload for JWT tokens.

## Utils

- **`authUtil.ts`**: Validate userID being passed in the request.
- **`jwt.ts`**: Generate JWT tokens.
- **`redisUtil.ts`**: Manages Redis operations for locking mechanisms.
    - **`getRedisValue`**
    - **`setRedisValue`**
    - **`deleteRedisValue`**

## Test Files Inside `__test__` Folders

- **`Routes`**:
    - **`authRoutes`**:
        - **`login.test.ts`** and **`register.test.ts`**: Tests for user registration and login routes.


- **`Services`**:
    - **`couponBookService`**:
        - **`createCouponBook.test.ts`**: Tests for creating a coupon book.
        - **`uploadCouponCodes.test.ts`**: Tests for uploading coupon codes to a coupon book.
    - **`couponService`**:
        - **`assignCouponToUser.test.ts`**: Tests for assigning a coupon to a user.
        - **`assignSpecificCouponToUser.test.ts`**: Tests for assigning a specific coupon to a user.
        - **`getUserAssignedCoupons.test.ts`**: Tests for getting all coupons assigned to a user.
        - **`lockCouponForRedemption.test.ts`**: Tests for locking a coupon for redemption.
        - **`redeemCouponForUser.test.ts`**: Tests for redeeming a coupon for a user.

## Dockerfile and Docker Compose Explanation

- **`Dockerfile`**: Run migrations and start the application.

- **`docker-compose.yml`**: Defines the Docker services for the application.
    - **`app`**: The main application service.
    - **`db`**: The PostgreSQL database service.
    - **`redis`**: The Redis service for caching and locking.

## Linter and Prettier

- **ESLint**: Linting tool for identifying and fixing problems in the code.
- **Prettier**: Code formatter for maintaining consistent code style.

## Author

This project was created by Gonzalo Avila.