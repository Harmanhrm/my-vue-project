// server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;

// PostgreSQL client setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Didar1982',
  port: 5432,
});

app.use(express.json());
app.use(cors());

// Get all workouts
app.get('/workouts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM workouts');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Add a new workout
app.post('/workouts', async (req, res) => {
  const { userid, title, workoutType } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO workouts (userid, title, workoutType) VALUES ($1, $2, $3) RETURNING *',
      [userid, title, workoutType]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
