-- Drops data and recreates a branch new one for every run on postgresql
DROP TABLE IF EXISTS rides;
DROP TABLE IF EXISTS users;

CREATE TABLE "users" (
  "id" serial PRIMARY KEY,
  "username" varchar(50) UNIQUE,
  "email" varchar(50) UNIQUE NOT NULL,
  "password_hash" varchar(255) NOT NULL,
  "first_name" varchar(100),
  "last_name" varchar(100),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "rides" (
  "id" serial PRIMARY KEY,
  "user_id" integer REFERENCES users(id), -- FK: each ride belongs to one user
  -- this is an inline FK, the other syntax is CONSTRAINT...
  "title" varchar(30),
  "description" varchar(500),
  "distance" DECIMAL(5, 1),
  "avg_speed" DECIMAL(4, 1),
  "avg_power" integer,
  "ride_date" date,
  "created_at" timestamptz NOT NULL DEFAULT now()
); 