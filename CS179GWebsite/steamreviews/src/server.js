const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

// Create a connection to the database
const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root',
  password: 'group9',
  database: 'group9_db'
});


// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});


app.get('/task2', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    console.log(page);
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    let appName = req.query.appName || ''; // Get the appName query parameter
    appName = decodeURIComponent(appName); // Decode the appName
    const sortBy = req.query.sortBy || 'votes_helpful'; 

    const query = `SELECT * FROM task2 WHERE app_name LIKE ? ORDER BY ${sortBy === 'asc' ? 'votes_helpful' : 'votes_helpful DESC'} LIMIT ?, ?`;
  
    // Execute the query
    db.query(query, [`%${appName}%`, offset, limit], (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Error fetching data from the database');
        return;
      }
      // Send the results back as JSON
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.json(results);
    });
  });


  app.get('/task3', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    console.log(page);
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    let appName = req.query.appName || ''; // Get the appName query parameter
    appName = decodeURIComponent(appName); // Decode the appName
    const sortBy = req.query.sortBy || 'scaled_avg_enjoyment_score'; 

    const query = `SELECT * FROM task3 WHERE app_name LIKE ? ORDER BY ${sortBy === 'asc' ? 'scaled_avg_enjoyment_score' : 'scaled_avg_enjoyment_score DESC'} LIMIT ?, ?`;

    // Execute the query
    db.query(query, [`%${appName}%`, offset, limit], (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Error fetching data from the database');
        return;
      }
      // Send the results back as JSON
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.json(results);
    });
  });


  app.get('/task4', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    console.log(page);
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    const sortBy = req.query.sortBy || 'count'; // Default sort by count

    const query = `SELECT * FROM task4 ORDER BY ${sortBy === 'asc' ? 'count' : 'count DESC'} LIMIT ?, ?`;
  
    // Execute the query
    db.query(query, [offset, limit], (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Error fetching data from the database');
        return;
      }
      // Send the results back as JSON
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.json(results);
    });
  });


  app.get('/task5', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    console.log(page);
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    let appName = req.query.appName || ''; // Get the appName query parameter
    appName = decodeURIComponent(appName); // Decode the appName
    const sortBy = req.query.sortBy || 'popularity_score'; 
    
    const query = `SELECT * FROM task5 WHERE app_name LIKE ? ORDER BY ${sortBy === 'asc' ? 'popularity_score' : 'popularity_score DESC'} LIMIT ?, ?`;

    // Execute the query
    db.query(query, [`%${appName}%`, offset, limit], (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Error fetching data from the database');
        return;
      }
      // Send the results back as JSON
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.json(results);
    });
  });


  app.get('/task6', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    console.log(page);
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    let appName = req.query.appName || ''; // Get the appName query parameter
    appName = decodeURIComponent(appName); // Decode the appName
    const sortBy = req.query.sortBy || 'author_num_reviews'; 

    const query = `SELECT * FROM task6 WHERE app_name LIKE ? ORDER BY ${sortBy === 'asc' ? 'author_num_reviews' : 'author_num_reviews DESC'} LIMIT ?, ?`;
  
    // Execute the query
    db.query(query, [`%${appName}%`, offset, limit], (err, results) => {
      if (err) {
        console.error('Error executing the query:', err);
        res.status(500).send('Error fetching data from the database');
        return;
      }
      // Send the results back as JSON
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.json(results);
    });
  });



// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});