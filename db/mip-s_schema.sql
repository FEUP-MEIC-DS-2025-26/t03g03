-- Drop existing Tables (safe reset)
DROP TABLE IF EXISTS award CASCADE;
DROP TABLE IF EXISTS review CASCADE;
DROP TABLE IF EXISTS used_points CASCADE;
DROP TABLE IF EXISTS loyalty CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TYPE IF EXISTS AWARD_TYPE;

-- Create Enums
CREATE TYPE AWARD_TYPE AS ENUM('best', 'most_sold', 'revelation');

-- Create Tables
CREATE TABLE award (
    id SERIAL PRIMARY KEY,
    year SMALLINT NOT NULL DEFAULT date_part('year', NOW()),
    award_type AWARD_TYPE NOT NULL,
    product_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL
);

CREATE TABLE review (
    id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL,
    rating NUMERIC(1, 0) NOT NULL CHECK(rating >= 1) CHECK(rating <=5),
    comment TEXT DEFAULT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE used_points (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL,
    points INTEGER NOT NULL
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  rank INTEGER NOT NULL,
  description TEXT,
  image_url TEXT
);

CREATE TABLE loyalty (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    points INTEGER NOT NULL
);
