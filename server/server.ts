import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import cors from 'cors';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

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
      throw new Error('Invalid or missing entry.');
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
      throw new Error(`Failed to retrive user: ${username}`);
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
      throw new Error('Invalid or missing entry');
    }

    // sql script to search for username
    const sql = `
    select "id", "username", "email", "password_hash" from "users"
    where "username" = $1;
  `;

    const param = [username];
    const [user] = (await db.query(sql, param)).rows;

    if (!user) {
      throw new Error(`Invalid login`);
    }

    // validate password
    const validPassword = await argon2.verify(user.password_hash, password);
    if (!validPassword) {
      throw new Error('Invalid email or password');
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

//  GET all
app.get('/', async (req, res, next) => {
  try {
    res.send('Hello World!');
    console.log('Terminal: Hello, World!');
  } catch (e) {
    next(e);
  }
});

// Inserting
app.post('/api/rides', async (req, res, next) => {
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
      throw new Error('401, No data found for /api/rides');
    }

    const sql = `
      insert into rides ("title", "description", "distance", "avg_speed", "avg_power", "ride_date")
      values ($1, $2, $3, $4, $5, $6)
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
      ])
    ).rows;
    if (!rides) {
      throw new Error('failed to post ride log');
    }

    // send status and json
    res.status(201).json(rides);
  } catch (e) {
    next(e);
  }
});

// GET via Id
app.get('/api/rides/:paramId', async (req, res, next) => {
  try {
    const rideId = req.params.paramId;

    if (isNaN(+rideId) || !Number.isInteger(+rideId) || +rideId < 1) {
      throw new Error(`User with Id ${rideId} does not exist.`);
    }

    const sql = `
      select * from "rides"
      where "id" = $1
    `;
    const param = [rideId];
    const [result] = (await db.query(sql, param)).rows;

    if (!result) {
      throw new Error('Get /api/rides/:paramId Failed');
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
});

// Get all
app.get('/api/rides', async (req, res, next) => {
  try {
    const sql = `
      select * from rides;
    `;

    const result = (await db.query(sql)).rows;
    if (!result) {
      throw new Error('failed to get data /rides');
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

// Always at the bottom
app.listen(PORT, () => {
  console.log('Listening on port: 3000');
});
