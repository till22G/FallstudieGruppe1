const mysql = require("mysql");

function createNewConnection() {
  var tempConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  });
  return tempConnection;
}

exports.createUser = function(data, callback) {
  console.log("DBService createUser " + data);

  var insertQuery =
    "INSERT INTO REGUSER (??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
  query = mysql.format(insertQuery, data);

  var connection = createNewConnection();
  connection.connect();
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log("DBService createUser ERR = " + err);
      callback(err, null);
    } else {
      console.log("DBService createUser ROWS = " + rows);
      callback(null, rows);
    }
  });
  connection.end();
};

exports.getUserByName = function(loginName, callback) {
  console.log("DBService getUserByName " + loginName);
  var selectQuery = "SELECT * FROM REGUSER WHERE LOGINNAME = ?";
  var query = mysql.format(selectQuery, [loginName]);

  var connection = createNewConnection();
  connection.connect();
  console.log("DBService getUserByName QUERY = " + query);
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log("DBService getUserByName ERR = " + err);
      callback(err, null);
    } else {
      console.log("DBService getUserByName ROWS = " + rows);
      callback(null, rows);
    }
  });
  connection.end();
};

exports.getUserById = function(userId, callback) {
  console.log("DBService getUserById " + userId);
  var selectQuery = "SELECT * FROM REGUSER WHERE USERID = ?";
  var query = mysql.format(selectQuery, [userId]);
  var connection = createNewConnection();
  connection.connect();
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log("DBService getUserById ERR = " + err);
      callback(err, null);
    } else {
      console.log("DBService getUserById ROWS = " + rows);
      callback(null, rows);
    }
  });
  connection.end();
};
