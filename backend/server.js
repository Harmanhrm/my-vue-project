const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { URL } = require('url');

dotenv.config({ path: '.env' });

const app = express();
const port = 5000;
const secretKey = 'notasecret'; 

/*let dbConfig = { 
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || 'st1234',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
};


const pool = new Pool(dbConfig);
*/

let dbConfig = {
  user: process.env.POSTGRES_USER || 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  database: process.env.POSTGRES_DATABASE || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'st1234',
  port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : 5432,
  ssl: {
    rejectUnauthorized: false,
  },
};

const pool = new Pool(dbConfig);

if (process.env.POSTGRES_URL) {
  try {
    const dbUrl = new URL(process.env.POSTGRES_URL);
    dbConfig = {
      user: dbUrl.username,
      host: dbUrl.hostname,
      database: dbUrl.pathname.split('/')[1],
      password: dbUrl.password,
      port: dbUrl.port ? parseInt(dbUrl.port, 10) : 5432,
      ssl: {
        rejectUnauthorized: false,
      },
    };
console.log('Attempting to connect to remote PostgreSQL:');

const remotePool = new Pool(dbConfig);
remotePool.connect((remoteErr) => {
  if (remoteErr) {
    console.error('Remote PostgreSQL connection failed:', remoteErr);
  } else {
    console.log('Connected to remote PostgreSQL');
    app.locals.pool = remotePool;
  }
});
} catch (error) {
console.error('Invalid POSTGRES_URL:', error);
}
} else {
console.log('Connected to local PostgreSQL');
app.locals.pool = pool;
}


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
      'INSERT INTO workouts (userid, title, workout_Type) VALUES ($1, $2, $3) RETURNING *',
      [userid, title, workoutType]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Sign up new user
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    res.status(201).json(result.rows[0]); // Send back the created user
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Log in user
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).send('User not found');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send('Incorrect password');
    }

    const token = jwt.sign({ userid: user.userid, username: user.username, email: user.email }, secretKey, { expiresIn: '1h' });
    res.status(200).json({
      token,
      user: {
        userid: user.userid,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/get-userid', async (req, res) => {
  const { title } = req.body;
  console.log('Received request to get user ID for title:', title); // Add logging for debugging

  try {
    const result = await pool.query('SELECT userid FROM workouts WHERE title = $1', [title]);
    if (result.rows.length > 0) {
      res.json({ userid: result.rows[0].userid });
    } else {
      res.status(404).json({ error: 'Workout not found' });
    }
  } catch (err) {
    console.error('Error in /get-userid endpoint:', err); // Improved error logging
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a new exercise and related sets
app.post('/save-workout', async (req, res) => {
  const { userid, title, exercises, note } = req.body;

  try {
    // Check if workout with the given title already exists
    const existingWorkoutResult = await pool.query(
      'SELECT * FROM workouts WHERE title = $1 AND userid = $2',
      [title, userid]
    );

    let workoutId;

    if (existingWorkoutResult.rows.length > 0) {
      // Workout with the title already exists
      workoutId = existingWorkoutResult.rows[0].workoutid;
    } else {
      // Insert workout and get its ID
      const workoutResult = await pool.query(
        'INSERT INTO workouts (userid, title) VALUES ($1, $2) RETURNING workoutid',
        [userid, title]
      );
      workoutId = workoutResult.rows[0].workoutid;
    }

    // Insert exercises and sets
    for (const exercise of exercises) {
      const exerciseResult = await pool.query(
        'INSERT INTO exercises (workoutid, note) VALUES ($1, $2) RETURNING exerciseid',
        [workoutId, exercise.note]
      );
      const exerciseId = exerciseResult.rows[0].exerciseid;

      // Insert sets
      for (const set of exercise.sets) {
        await pool.query(
          'INSERT INTO sets (exerciseid, reps, weight, rpe) VALUES ($1, $2, $3, $4)',
          [exerciseId, set.reps, set.weight, set.rpe]
        );
      }
    }

    res.status(201).send('Workout saved successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get workout history
app.get('/get-workout-history', async (req, res) => {
  const { title } = req.query; // Get title from query parameters
  console.log('Received request for workout history with title:', title); // Add logging for debugging

  try {
    // Fetch workout details
    const workoutResult = await pool.query(
      `SELECT * FROM workouts WHERE title = $1`,
      [title]
    );
    if (workoutResult.rows.length === 0) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    const workoutId = workoutResult.rows[0].workoutid;

    // Fetch exercises related to the workout
    const exercisesResult = await pool.query(
      `SELECT * FROM exercises WHERE workoutid = $1`,
      [workoutId]
    );

    const exercises = await Promise.all(exercisesResult.rows.map(async (exercise) => {
      // Fetch sets for each exercise
      const setsResult = await pool.query(
        `SELECT * FROM sets WHERE exerciseid = $1`,
        [exercise.exerciseid]
      );
      return {
        ...exercise,
        sets: setsResult.rows
      };
    }));

    res.json({
      workout: workoutResult.rows[0],
      exercises
    });
  } catch (err) {
    console.error('Error in /get-workout-history endpoint:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/user-info', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(401).send('Token required');
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    res.json(decodedToken); // This includes username and other details
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(401).send('Invalid token');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});