const mysql = require("mysql");

//-----------------------------------------------------//
function createNewConnection(multiple) {
  var tempConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: multiple
  });
  return tempConnection;
}
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.createUser = function(data, callback) {
  console.log("DBService createUser Start");

  var insertQuery =
    "INSERT INTO REGUSER (`SYS_CREATE_DATE`,`LOGINNAME`,`PASSWORD`,`RU_FIRSTNAME`,`RU_SURNAME`,`LOCKED`,`BALANCE`,`CURRENCY`,`COUNTRY`,`ROLE`,`LANGUAGE`,`LAST_LOGIN_DATE`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);";
  query = mysql.format(insertQuery, data);

  var connection = createNewConnection(false);
  connection.connect();
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log("DBService createUser ERR = " + err);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
  connection.end();
};
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.getUserByName = function(loginName, callback) {
  console.log("DBService getUserByName Start");
  var selectQuery = "SELECT * FROM REGUSER WHERE LOGINNAME = ?;";
  var query = mysql.format(selectQuery, [loginName]);

  var connection = createNewConnection(false);
  connection.connect();
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log("DBService getUserByName ERR = " + err);
      callback(err, null);
    } else {
      if (rows && rows.length > 0) {
        callback(null, rows);
      } else {
        callback("No Results found!", null);
      }
    }
  });
  connection.end();
};
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.getUserById = function(userId, callback) {
  console.log("DBService getUserById Start");
  var selectQuery = "SELECT * FROM REGUSER WHERE USERID = ?;";
  var query = mysql.format(selectQuery, [userId]);
  var connection = createNewConnection(false);
  connection.connect();
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log("DBService getUserById ERR = " + err);
      callback(err, null);
    } else {
      if (rows && rows.length > 0) {
        callback(null, rows);
      } else {
        callback("No Results found!", null);
      }
    }
  });
  connection.end();
};
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.doTransaction = function(data, callback) {
  console.log("DBService doTransaction Start");
  var updateQuery1 =
    "UPDATE REGUSER SET BALANCE = BALANCE - ? WHERE USERID = ?;";
  var updateQuery2 =
    "UPDATE REGUSER SET BALANCE = BALANCE + ? WHERE USERID = ?;";
  var insertQuery =
    "INSERT INTO TRANSACTION (`SYS_CREATE_DATE`, `SENDER`, `RECEIVER`, `AMOUNT`, `FEE`, `CURRENCY`, `CATEGORY`, `COMMENT`) VALUES (?,?,?,?,?,?,?,?);";
  var updateQuery3 =
    "UPDATE REGUSER SET BALANCE = BALANCE + ? WHERE USERID = " +
    process.env.DB_INDEPAYACCOUNT +
    ";";
  var totalQuery = updateQuery1 + updateQuery2 + insertQuery + updateQuery3;

  var query = mysql.format(totalQuery, data);
  var connection = createNewConnection(true);
  connection.connect();
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log("DBService getUserById ERR = " + err);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
  connection.end();
};
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.createContact = function(data, callback) {
  console.log("DBService createContact Start");

  var insertQuery =
    "INSERT INTO CONTACTLINKS (`SYS_CREATE_DATE`, `USER`, `USERCONTACT`, `COMMENT`) VALUES (?,?,?,?);";
  query = mysql.format(insertQuery, data);

  var connection = createNewConnection(false);
  connection.connect();
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log("DBService createContact ERR = " + err);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
  connection.end();
};
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.getContacts = function(userId, callback) {
  console.log("DBService getContacts Start");
  var selectQuery =
    "SELECT * FROM CONTACTLINKS CL JOIN REGUSER RU ON CL.USERCONTACT = RU.USERID WHERE USER = ?;";
  var query = mysql.format(selectQuery, [userId]);

  var connection = createNewConnection(false);
  connection.connect();
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log("DBService getContacts ERR = " + err);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
  connection.end();
};
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.checkContact = function(data, callback) {
  console.log("DBService checkContact Start");
  var selectQuery =
    "SELECT * FROM CONTACTLINKS WHERE USER = ? AND USERCONTACT = ?;";
  var query = mysql.format(selectQuery, data);
  var connection = createNewConnection(false);
  connection.connect();
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log("DBService checkContact ERR = " + err);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
  connection.end();
};
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.getLastTransactions = function(data, callback) {
  console.log("DBService getLastTransactions Start");
  var selectQuery =
    "SELECT * FROM TRANSACTION WHERE (SENDER = ? OR RECEIVER = ?) ORDER BY SYS_CREATE_DATE LIMIT ?,?";
  var query = mysql.format(selectQuery, data);
  var connection = createNewConnection(false);
  connection.connect();
  connection.query(query, function(err, rows, fields) {
    if (err) {
      console.log("DBService getLastTransactions ERR = " + err);
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
  connection.end();
};
//-----------------------------------------------------//
