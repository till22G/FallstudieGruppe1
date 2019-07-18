var express = require("express");
var router = express.Router();

const checkAuthentication = require("./middleware/check-authentication");
const userControl = require("./user-controller");
const transactionControl = require("./transaction-controller");
const contactControl = require("./contact-controller");

// The path for registering new users
router.post("/api/v1/users", function(req, res) {
  console.log("Router POST /api/v1/users");
  userControl.createUser(req, res);
});

// The path for getting user info and login
router.post("/api/v1/users/read", function(req, res) {
  console.log("Router GET /api/v1/users/read"); // @ToDo should be GET api/v1/users/?loginname&password
  userControl.getUser(req, res);
});

// The lightweight path for getting user balance of already logged in user
router.get("/api/v1/users/balance", checkAuthentication);
router.get("/api/v1/users/balance", function(req, res) {
  console.log("Router GET /api/v1/users/balance");
  userControl.getUserBalance(req, res);
});

// The path for creating a transaction for a logged in user
router.post("/api/v1/transactions", checkAuthentication);
router.post("/api/v1/transactions", function(req, res) {
  console.log("Router POST api/v1/transactions");
  transactionControl.createTransaction(req, res);
});

// The path for getting the calculated fee for a certain amount
router.post("/api/v1/transactions/fee", checkAuthentication);
router.post("/api/v1/transactions/fee", function(req, res) {
  console.log("Router GET api/v1/transactions/fee"); //@ToDo should be GET api/v1/transactions/?amount
  transactionControl.getCalculatedFee(req, res);
});

// The path for getting the last few transactions with pagination parameters for a logged in user
router.get("/api/v1/transactions/last/", checkAuthentication);
router.get("/api/v1/transactions/last/", function(req, res) {
  console.log("Router GET api/v1/transactions/last/");
  transactionControl.getLastTransactions(req, res);
});

// The path for creating a new contact for a logged in user
router.post("/api/v1/contacts", checkAuthentication);
router.post("/api/v1/contacts", function(req, res) {
  console.log("Router POST /api/v1/contacts");
  contactControl.createContact(req, res);
});

// The path for getting all contacts of a logged in user
router.get("/api/v1/contacts/read", checkAuthentication);
router.get("/api/v1/contacts/read", function(req, res) {
  console.log("Router GET /api/v1/contacts/read");
  contactControl.getContacts(req, res);
});

//--------------------------------------------------//
// In case no other URL worked
router.use((req, res, next) => {
  res.status(201).send("Not a valid path!");
});
//--------------------------------------------------//

// Exports
module.exports = router;
