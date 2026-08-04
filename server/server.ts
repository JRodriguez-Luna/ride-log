import express from 'express';
import pg from 'pg';
import cors from 'cors';

const app = express();
const PORT = 3000;

const db = new pg.Pool({
  connectionString: 'postgresql://localhost:5432/ridelog',
});

app.use(express.json());
app.use(cors())

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
