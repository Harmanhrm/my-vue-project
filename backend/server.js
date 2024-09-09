// server.js
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 5000;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey';
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
      // Check if the user exists
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
  
      if (!user) {
        return res.status(400).send('User not found');
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(400).send('Incorrect password');
      }
  
      // Create JWT token with actual user data
      const token = jwt.sign({ userid: user.userid, email: user.email }, secretKey, { expiresIn: '1h' });
      console.log('Generated Token:', token); // Log the generated token

      // Send user data along with the token
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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
