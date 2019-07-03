require("./env");
const router = require("./router");

const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

const jwt = require("jsonwebtoken");

const app = express();


//--------------------------------------------------//
// Necessary to have an easier request body to work with
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Necessary to access to other servers on different hosts and ports
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

app.use("/test", router);
app.use("/", router);

//--------------------------------------------------//

//--------------------------------------------------//
// In case no other URI worked
app.use((req, res, next) => {
  res.send("Not a valid path!");
});
//--------------------------------------------------//

// Exports
module.exports = app;
