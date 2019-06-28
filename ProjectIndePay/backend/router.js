var express = require("express");
var router = express.Router();

const userControl = require("./userControl");
const transactionControl = require("./transactionControl");

router.get("/create", function(req, res) {
  console.log("Router GET /create");
  // TEST
  req.body.loginName = "routeTest";
  req.body.password = "routeTest123";
  req.body.firstName = "route";
  req.body.lastName = "test";
  // TEST END
  userControl.createUser(req, res);
});

router.get("/read", function(req, res) {
  console.log("Router GET /read");
  // TEST
  req.body.loginName = "routeTest";
  req.body.password = "routeTest123";
  req.body.firstName = "route";
  req.body.lastName = "test";
  // TEST END
  userControl.getUser(req, res);
});

module.exports = router;
