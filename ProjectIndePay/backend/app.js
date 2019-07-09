require("./env");
const router = require("./router");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//--------------------------------------------------//
// Necessary to have an easier request body to work with
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Necessary to access to other servers on different hosts and ports
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log('Access-Control-Allow-Origin');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authentication"
  );
  console.log('Access-Control-Allow-Origin + Origin...');
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
//--------------------------------------------------//

app.use("/", router);

// Exports
module.exports = app;
