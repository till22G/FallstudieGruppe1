var express = require("express");
var router = express.Router();

const checkAuthentication = require("./middleware/check-authentication");
const userControl = require("./user-controller");
const transactionControl = require("./transaction-controller");
const contactControl = require("./contact-controller");

router.post("/api/v1/users/create", function(req, res) {
  console.log("Router POST /api/v1/users/create");
  userControl.createUser(req, res);
});

router.post("/api/v1/users/read", function(req, res) {
  console.log("Router GET /api/v1/users/read");
  userControl.getUser(req, res);
});

// router.post("/api/v1/users/balance", checkAuthentication);
router.post("/api/v1/users/balance", function(req, res) {
  console.log("Router GET /api/v1/users/balance");
  userControl.getUserBalance(req, res);
});

// router.post("/api/v1/transactions/create", checkAuthentication);
router.post("/api/v1/transactions/create", function (req, res) {
  console.log("Router POST api/v1/transactions/create");
  transactionControl.createTransaction(req, res);
});

// router.post("/api/v1/transactions/fee", checkAuthentication);
router.post("/api/v1/transactions/fee", function (req, res) {
  console.log("Router GET api/v1/transactions/create");
  transactionControl.getCalculatedFee(req, res);
});

// router.post("/api/v1/contacts/create", checkAuthentication);
router.post("/api/v1/contacts/create", function(req, res) {
  console.log("Router POST /api/v1/contacts/create");
  contactControl.createContact(req, res);
});

// router.post("/api/v1/contacts/read", checkAuthentication);
router.post("/api/v1/contacts/read", function(req, res) {
  console.log("Router GET /api/v1/contacts/read");
  contactControl.getContacts(req, res);
});

// ------------------------------ //
// THIS BLOCK IS FOR TESTING ONLY //
// ------------------------------ //

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
