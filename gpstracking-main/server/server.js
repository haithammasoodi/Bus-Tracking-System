const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ STEP 1: Create and connect MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'haseeb!@', // 🔁 Add your MySQL root password here if set
  database: 'gps_data'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err);
  } else {
    console.log('✅ Connected to MySQL database.');
  }
});

// ✅ STEP 2: Routes

// Store GPS location
app.post('/updateLocation', (req, res) => {
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Missing latitude or longitude' });
  }

  db.query(
    'INSERT INTO location_data (latitude, longitude) VALUES (?, ?)',
    [latitude, longitude],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ status: 'Location saved' });
    }
  );
});

// Store student boarding
app.post('/boarded', (req, res) => {
  const { student_id } = req.body;
  if (!student_id) {
    return res.status(400).json({ error: 'Missing student_id' });
  }

  db.query(
    'INSERT INTO boarding_logs (student_id) VALUES (?)',
    [student_id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ status: 'Boarding logged' });
    }
  );
});

// GET recent boarding logs
app.get('/logs', (req, res) => {
  const query = 'SELECT * FROM boarding_logs ORDER BY timestamp DESC LIMIT 10';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET latest GPS coordinates
app.get('/getLatestLocation', (req, res) => {
  const query = 'SELECT * FROM location_data ORDER BY timestamp DESC LIMIT 1';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) {
      const { latitude, longitude } = results[0];
      res.json({ latitude, longitude });
    } else {
      res.json({ latitude: null, longitude: null });
    }
  });
});

// Serve frontend from public/ directory
app.use(express.static('public'));

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
