const mysql      = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

var connection = mysql.createConnection({
  host     : 'db4free.net',
  //port     : 3306,
  user     : 'alexander92',
  password : 'esistsoschön',
  database : 'fallstudieindepa'
});
console.log('Trying to connect...');

connection.connect();
console.log('Connected!');

console.log('Starting query....');
connection.query('SELECT * from REGUSER', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query. ', err);
});

connection.end();

module.exports = app;
