const DBService = require("./service");
const userControl = require("./user-controller");

//-----------------------------------------------------//
exports.createTransaction = function(req, res) {
  console.log("transaction-controller createTransaction ");
  // check validity of sender and receiver @ToDo maybe already check this, onFormChange?

  // check whether sender has enough money
  DBService.getUserById(req.body.sender, function(err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      var row = result[0];
      var total = req.body.amount * 1 + req.body.fee * 1;
      if (row.BALANCE >= total) {
        var data = [
          total,
          req.body.sender,
          req.body.amount,
          req.body.receiver,
          new Date(),
          req.body.sender,
          req.body.receiver,
          req.body.amount,
          req.body.fee,
          req.body.currency,
          req.body.category,
          req.body.comment
        ];
        DBService.doTransaction(data, function(err, result) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            res.status(201).json({
              message: "Transaction successfully created!"
            });
          }
        });
      } else {
        res.status(201).json({
          message:
            "Balance of " + row.BALANCE + " can not pay amount " + total + "!"
        });
      }
    }
  });
};
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.getCalculatedFee = function(req, res) {
  console.log("transaction-controller getCalculatedFee ");
  var amount = req.body.amount;
  if (amount <= process.env.MINIMAL_AMOUNT) {
    res.status(201).json({
      message:
        "Amount is smaller than minimal transaction amount of " +
        process.env.MINIMAL_AMOUNT +
        "!"
    });
  } else {
    var fee = amount * process.env.FEE_PERCENTAGE;
    fee = Math.floor(fee * 100) / 100;
    res.status(201).json({
      message: "Calculation successful!",
      fee: fee,
      feePercentage: process.env.FEE_PERCENTAGE
    });
  }
};
//-----------------------------------------------------//
