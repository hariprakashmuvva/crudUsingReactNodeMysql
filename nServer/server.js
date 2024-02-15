const express = require('express');
const mysql = require('mysql2');
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(cors())
const port = 5000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'emp'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});



// Body Parser Middleware
app.use(bodyParser.json());

// Create a new record
app.post('/api/insertRecord', (req, res) => {
  const { empno, empname, empsalary, age } = req.body;
  const INSERT_RECORD_QUERY = `INSERT INTO employee (empno, empname, empsalary, age) VALUES ('${empno}', '${empname}', '${empsalary}', '${age}')`;
  db.query(INSERT_RECORD_QUERY, (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Record added successfully');
  });
});

// Read all records
app.get('/api/records', (req, res) => {
  const SELECT_ALL_RECORDS_QUERY = 'SELECT * FROM employee';
  db.query(SELECT_ALL_RECORDS_QUERY, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

// Read all records
app.get('/api/records/:id', (req, res) => {
  const id = req.params.id;
  const SELECT_ALL_RECORDS_QUERY = `SELECT * FROM employee where empno = ${id} `;
  db.query(SELECT_ALL_RECORDS_QUERY, (err, results) => {
    if (err) {
      throw err;
    }
    res.json(results);
  });
});

// Update a record
app.put('/api/updateRecord/:id', (req, res) => {
  const { empname, empsalary, age } = req.body;
  const { id } = req.params;
  const UPDATE_RECORD_QUERY = `UPDATE employee SET empname='${empname}', empsalary='${empsalary}', age='${age}' WHERE empno=${id}`;
  db.query(UPDATE_RECORD_QUERY, (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Record updated successfully');
  });
});


// Delete a record
app.delete('/api/deleteRecord/:id', (req, res) => {
  const { id } = req.params;
  const DELETE_RECORD_QUERY = `DELETE FROM employee WHERE empno=${id}`;
  db.query(DELETE_RECORD_QUERY, (err, result) => {
    if (err) {
      throw err;
    }
    res.send('Record deleted successfully');
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
