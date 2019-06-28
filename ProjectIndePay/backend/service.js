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

exports.createUser = function(data, res) {
  console.log("DBService createUser " + data);

  var insertQuery =
    "INSERT INTO REGUSER (??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
  query = mysql.format(insertQuery, data);

  var connection = createNewConnection();
  connection.connect();
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (!err) {
      if (rows.affectedRows == 1) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log(err);
      res.send(err);
    }
  });
  connection.end();
};

exports.getUserByName = function(loginName, res) {
  console.log("DBService getUserByName " + loginName);
  var selectQuery = "SELECT * FROM REGUSER WHERE LOGINNAME = ?";
  var query = mysql.format(selectQuery, [loginName]);

  var connection = createNewConnection();
  connection.connect();
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (!err) {
      console.log("DBService getUserByName ROWS = " + rows)
      return rows;
    } else {
      console.log(err);
      res.send(err);
    }
  });
  connection.end();
};

exports.getUserById = function(userId, res) {
  console.log("DBService getUserById " + userId);
  var selectQuery = "SELECT * FROM REGUSER WHERE USERID = ?";
  var query = mysql.format(selectQuery, [userId]);
  var connection = createNewConnection();
  connection.connect();
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (!err) {
      return rows;
    } else {
      console.log(err);
      res.send(err);
    }
  });
  connection.end();
};
