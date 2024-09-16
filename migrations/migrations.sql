CREATE TABLE users
(
    id         SERIAL PRIMARY KEY,
    email      VARCHAR(255) UNIQUE NOT NULL,
    password   VARCHAR(255)        NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coupon_books
(
    id                           SERIAL PRIMARY KEY,
    name                         VARCHAR(255) NOT NULL,
    max_uses_per_user            INT,
    is_redeemable_multiple_times BOOLEAN     DEFAULT FALSE,
    created_at                   TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coupons
(
    id                  SERIAL PRIMARY KEY,
    code                VARCHAR(50) UNIQUE NOT NULL,
    coupon_book_id      INT REFERENCES coupon_books (id),
    assigned_to_user_id INT REFERENCES users (id),
    is_redeemed         BOOLEAN     DEFAULT FALSE,
    created_at          TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);