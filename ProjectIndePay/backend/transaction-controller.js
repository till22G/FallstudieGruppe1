const DBService = require("./service");
const userControl = require("./user-controller");

function calculateFee(amount) {
  var fee = amount * process.env.FEE_PERCENTAGE;
  fee = Math.floor(fee * 100) / 100;
  return fee;
}

//-----------------------------------------------------//
exports.createTransaction = function(req, res) {
  console.log("transaction-controller createTransaction ");
  var token = jwt.verify(
    req.headers.authentication.split(" ")[1],
    process.env.SECRET_KEY
  );

  // check whether sender has enough money
  DBService.getUserById(token.userId, function(err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("transaction-controller createTransaction 1");
      var row = result[0];
      var fee = calculateFee(amount);
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
        "Amount of " +
        amount +
        " is smaller than minimal transaction amount of " +
        process.env.MINIMAL_AMOUNT +
        "!"
    });
  } else {
    var fee = calculateFee(amount);
    res.status(201).json({
      message: "Calculation successful!",
      fee: fee,
      feePercentage: process.env.FEE_PERCENTAGE
    });
  }
};
//-----------------------------------------------------//
