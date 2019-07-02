var express = require("express");
var router = express.Router();

const userControl = require("./userControl");
const transactionControl = require("./transactionControl");

router.post("/api/v1/users/create", function(req, res) {
  console.log("Router GET /api/v1/users/create");
  userControl.createUser(req, res);
});

router.post("/api/v1/users/read", function(req, res) {
  console.log("Router GET /api/v1/users/read");
  userControl.getUser(req, res);
});

// ------------------------------ //
// THIS BLOCK IS FOR TESTING ONLY //
// ------------------------------ //
router.get("/api/v1/users/create", function(req, res) {
  console.log("Router GET /create");
  // TEST
  req.body.loginName = "routeTest";
  req.body.password = "routeTest123";
  req.body.firstName = "route";
  req.body.lastName = "test";
  // TEST END
  userControl.createUser(req, res);
});

router.get("/api/v1/users/read", function(req, res) {
  console.log("Router GET /read");
  // TEST
  req.body.loginName = "routeTest";
  req.body.password = "someotherpassword";
  req.body.firstName = "route";
  req.body.lastName = "test";
  // TEST END
  userControl.getUser(req, res);
});

// ------------------------------ //
// THIS BLOCK IS FOR TESTING ONLY //
// ------------------------------ //

module.exports = router;
