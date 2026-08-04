CREATE TABLE "rides" (
  "id" serial PRIMARY KEY,
  "title" varchar(30),
  "description" varchar(500),
  "distance" DECIMAL(5, 1),
  "avg_speed" DECIMAL(4, 1),
  "avg_power" integer,
  "ride_date" date,
  "created_at" timestamptz NOT NULL DEFAULT now()
); 