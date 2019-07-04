var express = require("express");
var router = express.Router();

const checkAuthentication = require("./middleware/check-authentication");
const userControl = require("./user-controller");
const transactionControl = require("./transaction-controller");

router.post("/api/v1/users/create", function(req, res) {
  console.log("Router POST /api/v1/users/create");
  userControl.createUser(req, res);
});

router.post("/api/v1/users/read", function(req, res) {
  console.log("Router GET /api/v1/users/read");
  userControl.getUser(req, res);
});

router.post("/api/v1/transactions/create", checkAuthentication);
router.post("/api/v1/transactions/create", function (req, res) {
  console.log("Router POST api/v1/transactions/create");
  transactionControl.createTransaction(req, res);
});

router.post("/api/v1/transactions/fee", checkAuthentication);
router.post("/api/v1/transactions/fee", function (req, res) {
  console.log("Router GET api/v1/transactions/create");
  transactionControl.getCalculatedFee(req, res);
});

// ------------------------------ //
// THIS BLOCK IS FOR TESTING ONLY //
// ------------------------------ //

//router.get("/api/v1/transactions/create", checkAuthentication);
router.get("/api/v1/transactions/create", function (req, res) {
  console.log("Router GET api/v1/transactions/create");
  // TEST
  req.body.amount = "11.73";
  req.body.fee = "0.23";
  req.body.currency = "1";
  req.body.receiver = "1";
  req.body.sender = "6";
  req.body.category = "1";
  req.body.comment = "funny toilet paper";
  // TEST END
  transactionControl.createTransaction(req, res);
});

// ------------------------------ //
// THIS BLOCK IS FOR TESTING ONLY //
// ------------------------------ //

//--------------------------------------------------//
// In case no other URI worked
router.use((req, res, next) => {
  res.send("Not a valid path!");
});
//--------------------------------------------------//

module.exports = router;
