const DBService = require("./service");
const userControl = require("./user-controller");
const jwt = require("jsonwebtoken");

function calculateFee(amount, callback) {
  console.log("calculateFee amount + " + amount);
  var fee = amount * process.env.FEE_PERCENTAGE;
  fee = Math.floor(fee * 100) / 100;
  console.log("calculateFee fee + " + fee);
  callback(null, fee);
}

//-----------------------------------------------------//
exports.createTransaction = function(req, res) {
  console.log("transaction-controller createTransaction Start");
  var token = jwt.verify(
    req.headers.authentication.split(" ")[1],
    process.env.SECRET_KEY
  );

  if (req.body.amount >= process.env.MINIMAL_AMOUNT) {
    DBService.getUserById(token.userId, function(err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        var row = result[0];
        calculateFee(req.body.amount, function(err, fee) {
          var total = req.body.amount * 1 + fee * 1;
          if (row.BALANCE >= total) {
            DBService.getUserByName(req.body.receiver, function(err, result) {
              if (err) {
                console.log(err);
                res.send(err);
              } else {
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
                  req.body.comment,
                  fee
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
  console.log("transaction-controller getCalculatedFee Start");
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
  var token = jwt.verify(
    req.headers.authentication.split(" ")[1],
    process.env.SECRET_KEY
  );
  console.log("Queryparams = " + req.query.pagesize + " " + req.query.page);
  let offset = (req.query.page - 1) * req.query.pagesize * 1;
  let limit = req.query.pagesize * 1;
  var data = [
    token.userId,
    token.userId,
    offset,
    limit
  ];
  DBService.getLastTransactions(data, function(err, results) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      var returnObject = results.map(result => ({
        transactionDate: result.SYS_CREATE_DATE,
        totalAmount: result.AMOUNT * 1 + result.FEE * 1,
        amount: result.AMOUNT,
        fee: result.FEE,
        currency: result.CURRENCY,
        receiver: result.RECEIVER,
        sender: result.SENDER,
        category: result.CATEGORY,
        comment: result.COMMENT,
        direction: (result.RECEIVERID == token.userId) ? "Received" : "Sent"
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
