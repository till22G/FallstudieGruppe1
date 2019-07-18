require("./env");
const router = require("./router");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//--------------------------------------------------//
// Necessary parsers to have an easier request body to work with
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Necessary headers to access to other servers on different hosts and ports, cross-origin-issues, etc.
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authentication"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
//--------------------------------------------------//

// Import the routes
app.use("/", router);
console.log("Server has started!");

// Exports
module.exports = app;
