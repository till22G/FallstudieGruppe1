const DBService = require("./service");
const userControl = require("./user-controller");
const jwt = require("jsonwebtoken");

function calculateFee(amount, callback) {
  console.log("calculateFee + " + amount);
  var fee = amount * process.env.FEE_PERCENTAGE;
  fee = Math.floor(fee * 100) / 100;
  console.log("calculateFee + " + fee);
  callback(null, fee);
}

//-----------------------------------------------------//
exports.createTransaction = function(req, res) {
  console.log("transaction-controller createTransaction ");
  var token = jwt.verify(
    req.headers.authentication.split(" ")[1],
    process.env.SECRET_KEY
  );

  if (req.body.amount >= process.env.MINIMAL_AMOUNT) {
    // check whether sender has enough money
    DBService.getUserById(token.userId, function(err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log("transaction-controller createTransaction 1");
        var row = result[0];
        calculateFee(req.body.amount, function(err, fee) {
          var total = req.body.amount * 1 + fee * 1;
          if (row.BALANCE >= total) {
            DBService.getUserByName(req.body.receiver, function(err, result) {
              if (err) {
                console.log(err);
                res.send(err);
              } else {
                console.log("transaction-controller createTransaction 2");
                var data = [
                  total,
                  token.userId,
                  req.body.amount,
                  result[0].USERID,
                  new Date(),
                  token.userId,
                  result[0].USERID,
                  req.body.amount,
                  fee,
                  1, //req.body.currency,
                  1, //req.body.category,
                  req.body.comment
                ];
                DBService.doTransaction(data, function(err, result) {
                  if (err) {
                    console.log(err);
                    res.send(err);
                  } else {
                    console.log(
                      "transaction-controller createTransaction sending Response... "
                    );
                    res.status(201).json({
                      message: "Transaction successfully created!"
                    });
                  }
                });
              }
            });
          } else {
            console.log(
              "transaction-controller createTransaction sending Response... "
            );
            res.status(401).send(new Error("Not enough balance!"));
          }
        });
      }
    });
  } else {
    console.log("transaction-controller createTransaction sending Response...");
    res
      .status(401)
      .send(
        new Error(
          "Amount of " +
            amount +
            " is smaller than minimal amount " +
            process.env.MINIMAL_AMOUNT +
            "!"
        )
      );
  }
};
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.getCalculatedFee = function(req, res) {
  console.log("transaction-controller getCalculatedFee " + req.body.amount);
  var amount = req.body.amount;
  if (amount <= process.env.MINIMAL_AMOUNT) {
    console.log("transaction-controller getCalculatedFee sending Response...");
    res
      .status(401)
      .send(
        new Error(
          "Amount of " +
            amount +
            " is smaller than minimal amount " +
            process.env.MINIMAL_AMOUNT +
            "!"
        )
      );
  } else {
    calculateFee(amount, function(err, fee) {
      console.log("transaction-controller getCalculatedFee sending fee " + fee);
      console.log(
        "transaction-controller getCalculatedFee sending Response..."
      );
      res.status(201).json({
        message: "Calculation successful!",
        fee: fee,
        feePercentage: process.env.FEE_PERCENTAGE
      });
    });
  }
};
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.getLastTransactions = function(req, res) {
  console.log("transaction-controller getLastTransactions ");
  //var token = jwt.verify(
  //  req.headers.authentication.split(" ")[1],
  //  process.env.SECRET_KEY
  //);
  console.log("Queryparams = " + req.query.pagesize + " " + req.query.page)
  let offset = (req.query.page-1) * req.query.pagesize * 1;
  let limit = req.query.pagesize * 1;
  var data = [
    6, //token.userId,
    6, //token.userId,
    offset,
    limit
  ];
  DBService.getLastTransactions(data, function(err, results) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("transaction-controller getLastTransactions 1");
      var returnObject = results.map(result => ({
        transactionDate: result.SYS_CREATE_DATE,
        totalAmount: result.AMOUNT * 1 + result.FEE * 1,
        amount: result.AMOUNT,
        fee: result.FEE,
        currency: "UGX", // result.CURRENCY,
        receiver: result.RECEIVER,
        sender: result.SENDER,
        category: "Misc", // result.CATEGORY,
        comment: result.COMMENT
      }));
      console.log(
        "transaction-controller getLastTransactions sending Response..."
      );
      res.status(201).json({
        transactionList: returnObject
      });
    }
  });
};
//-----------------------------------------------------//
