import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import cors from 'cors';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { authMiddleware } from './lib/auth-middleware.ts';
import { errorMiddleware } from './lib/error-middleware.ts';
import { ClientError } from './lib/client-error.ts';

const secret = process.env.TOKEN_SECRET;
if (!secret) {
  throw new Error('TOKEN_SECRET not found in .env');
}

const app = express();
const PORT = 3000;

const db = new pg.Pool({
  connectionString: 'postgresql://localhost:5432/ridelog',
});

app.use(express.json());
app.use(cors());

// Auth

// Sign Up
app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    // entry from user
    const { username, email, password, first_name, last_name } = req.body;

    // if missing required entry, send error
    if (!username || !email || !password || !first_name || !last_name) {
      throw new ClientError(400, 'Invalid or missing entry');
    }

    // hash password
    const password_hash = await argon2.hash(password);

    // sql script to insert new user
    const sql = `
      insert into "users" ("username", "email", "password_hash", "first_name", "last_name")
      values($1, $2, $3, $4, $5)
      returning "id", "username", "email", "created_at";
    `;

    // destructing to put the values in
    const param = [username, email, password_hash, first_name, last_name];
    const [user] = (await db.query(sql, param)).rows;

    if (!user) {
      throw new ClientError(500, `Failed to retrive user: ${username}`);
    }

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

// Sign in
app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    // get user input
    const { username, password } = req.body;

    // if missing input, send error
    if (!username || !password) {
      throw new ClientError(400, 'Invalid or missing entry')
    }

    // sql script to search for username
    const sql = `
    select "id", "username", "email", "password_hash" from "users"
    where "username" = $1;
  `;

    const param = [username];
    const [user] = (await db.query(sql, param)).rows;

    if (!user) {
      throw new ClientError(401, 'Invalid username or password')
    }

    // validate password
    const validPassword = await argon2.verify(user.password_hash, password);
    if (!validPassword) {
      throw new ClientError(401, 'Invalid username or password')
    }

    // jwt tokenize
    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(payload, secret);

    res.status(200).json({
      user: payload,
      token,
    });
  } catch (error) {
    next(error);
  }
});

// Inserting
app.post('/api/rides', authMiddleware, async (req, res, next) => {
  try {
    const { title, description, distance, avg_speed, avg_power, ride_date } =
      req.body;

    if (
      !title ||
      !description ||
      distance < 0 ||
      !avg_speed ||
      !avg_power ||
      !ride_date
    ) {
      throw new ClientError(400, 'Invalid or missing entry');
    }

    const sql = `
      insert into rides ("title", "description", "distance", "avg_speed", "avg_power", "ride_date", "user_id")
      values ($1, $2, $3, $4, $5, $6, $7)
      returning *;
    `;

    const [rides] = (
      await db.query(sql, [
        title,
        description,
        distance,
        avg_speed,
        avg_power,
        ride_date,
        req.user?.id
      ])
    ).rows;
    if (!rides) {
      throw new ClientError(500, `User id ${req.user?.id} does not exists.`)
    }

    // send status and json
    res.status(201).json(rides);
  } catch (e) {
    next(e);
  }
});

// GET via Id
app.get('/api/rides/:paramId', authMiddleware, async (req, res, next) => {
  try {
    const rideId = req.params.paramId;

    if (isNaN(+rideId) || !Number.isInteger(+rideId) || +rideId < 1) {
      throw new ClientError(400, `Invalid ride id`);
    }

    const sql = `
      select * from "rides"
      where "id" = $1 and "user_id" = $2;
    `;

    const param = [rideId, req.user?.id];
    const [result] = (await db.query(sql, param)).rows;

    if (!result) {
      throw new ClientError(404, `Id ${rideId} does not exists.`)
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// Get all
app.get('/api/rides', authMiddleware, async (req, res, next) => {
  try {
    const sql = `
      select * from rides
      where "user_id" = $1
    `;

    const result = (await db.query(sql, [req.user?.id])).rows;

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

app.use(errorMiddleware)

// Always at the bottom
app.listen(PORT, () => {
  console.log('Listening on port: 3000');
});
