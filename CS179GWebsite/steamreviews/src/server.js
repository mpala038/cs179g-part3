const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 5000;

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'group9',
  database: 'group9_db'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(cors());
app.use(express.json());

app.get('/task5', (req, res) => {
  // Fetch tasks from database
  db.query('SELECT * FROM task5', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving tasks from database');
      return;
    }
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});