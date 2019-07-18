var express = require("express");
var router = express.Router();

const checkAuthentication = require("./middleware/check-authentication");
const userControl = require("./user-controller");
const transactionControl = require("./transaction-controller");
const contactControl = require("./contact-controller");

router.post("/api/v1/users", function(req, res) {
  console.log("Router POST /api/v1/users");
  userControl.createUser(req, res);
});

router.post("/api/v1/users/read", function(req, res) {
  console.log("Router GET /api/v1/users/read"); // should be GET api/v1/users/?loginname&password
  userControl.getUser(req, res);
});

router.get("/api/v1/users/balance", checkAuthentication);
router.get("/api/v1/users/balance", function(req, res) {
  console.log("Router GET /api/v1/users/balance");
  userControl.getUserBalance(req, res);
});

router.post("/api/v1/transactions", checkAuthentication);
router.post("/api/v1/transactions", function (req, res) {
  console.log("Router POST api/v1/transactions");
  transactionControl.createTransaction(req, res);
});

router.post("/api/v1/transactions/fee", checkAuthentication);
router.post("/api/v1/transactions/fee", function (req, res) {
  console.log("Router GET api/v1/transactions/fee"); // should be GET api/v1/transactions/?amount
  transactionControl.getCalculatedFee(req, res);
});

router.get("/api/v1/transactions/last/", checkAuthentication);
router.get("/api/v1/transactions/last/", function (req, res) {
  console.log("Router GET api/v1/transactions/last/");
  transactionControl.getLastTransactions(req, res);
});

router.post("/api/v1/contacts", checkAuthentication);
router.post("/api/v1/contacts", function(req, res) {
  console.log("Router POST /api/v1/contacts");
  contactControl.createContact(req, res);
});

router.get("/api/v1/contacts/read", checkAuthentication);
router.get("/api/v1/contacts/read", function(req, res) {
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
  res.status(201).send("Not a valid path!");
});
//--------------------------------------------------//

module.exports = router;
