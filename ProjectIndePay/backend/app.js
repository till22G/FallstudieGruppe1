const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//--------------------------------------------------//
// This function handles creation of a connection to db. It can be called multiple times, to create new connections.
// All opening and closing has to be done in calling function.
function createNewConnection() {
  var tempConnection = mysql.createConnection({
    //connectTimeout: 60 * 1000,
    host: "db4free.net",
    //port     : 3306,
    user: "alexander92",
    password: "esistsoschön",
    database: "fallstudieindepa"
  });
  return tempConnection;
}
//--------------------------------------------------//

//--------------------------------------------------//
// Necessary to have an easier request body to work with
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Necessary to access other servers on different hosts and ports
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
//--------------------------------------------------//

//--------------------------------------------------//
// This path should add new users to database
app.post("/control/users/create", (req, res, next) => {
  console.log("Request for new user: " + req.body);
  var selectQuery = "SELECT * FROM REGUSER WHERE LOGINNAME = ?";
  var data = [req.body.loginName];
  var query = mysql.format(selectQuery, data);
  var connection = createNewConnection();
  connection.connect();
  connection.query(query, function(err, rows, fields) {
    if (!err) {
      if (rows.length > 0){
        res.status(201).json({
          message: "User already exists!"
        });
      }else{
        console.log("User does not exist yet! Creating...");
      }
    } else {
      console.log(err);
      res.send(err);
    }
  });

  var insertQuery =
    "INSERT INTO REGUSER (??,??,??,??,??,??,??,??,??,??,??,??) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";
  var data = [
    "SYS_CREATE_DATE",
    "LOGINNAME",
    "PASSWORD",
    "RU_FIRSTNAME",
    "RU_SURNAME",
    "LOCKED",
    "BALANCE",
    "CURRENCY",
    "COUNTRY",
    "ROLE",
    "LANGUAGE",
    "LAST_LOGIN_DATE",
    new Date(),
    req.body.loginName,
    req.body.password,
    req.body.firstName,
    req.body.lastName,
    0,
    0,
    0,
    "GER", // @ToDo get real country from request
    1,
    "de", // @ToDo get real language from request
    new Date(0)
  ];
  query = mysql.format(insertQuery, data);

  connection.query(query, function(err, rows, fields) {
    if (!err) {
      console.log("Success!");
      res.status(201).json({
        message: "User added successfully"
      });
    } else {
      console.log(err);
      res.send(err);
    }
  });
  connection.end();
});
//--------------------------------------------------//

//--------------------------------------------------//
// This path is used for login. It also does the verification, and then sends relevant data back to client.
// @ToDo maybe some more tranlation of roles and currency on server side?
app.post("/control/users/read", (req, res, next) => {
  console.log("Request for existing user: " + req.body);
  var selectQuery = "SELECT * FROM REGUSER WHERE LOGINNAME = ?";
  var data = [req.body.loginName];
  var query = mysql.format(selectQuery, data);

  var connection = createNewConnection();
  connection.connect();
  connection.query(query, function(err, rows, fields) {
    if (!err) {
      console.log("Success!");
      console.log(rows);
      if (rows.length > 0) {
        var row = rows[0];
        if (row.LOCKED == 0) {
          if (row.PASSWORD == req.body.password) {
            res.status(201).json({
              message   : "Success!",
              firstName : row.RU_FIRSTNAME,
              surname   : row.RU_SURNAME,
              balance   : row.BALANCE,
              currency  : row.CURRENCY,
              role      : row.ROLE,
              language  : row.LANGUAGE // @ToDo webtoken authentification
            });
          } else {
            res.status(201).json({
              message: "Wrong password for user " + row.LOGINNAME + "!"
            });
          }
        } else {
          res.status(201).json({
            message: "User '" + row.LOGINNAME + "' has been locked!"
          });
        }
      } else {
        res.status(201).json({
          message: "User not found! Check Loginname!"
        });
      }
    } else {
      console.log(err);
      res.send(err);
    }
  });
  connection.end();
});

//--------------------------------------------------//

//--------------------------------------------------//
// In case no other URI worked
app.use((req, res, next) => {
  res.send("Not a valid path!");
});
//--------------------------------------------------//

// Exports
module.exports = app;
