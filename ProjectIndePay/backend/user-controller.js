const DBService = require("./service");

const jwt = require("jsonwebtoken");

//-----------------------------------------------------//
function sendUserData(row, res) {
  var claims = {
    userId: row.USERID,
    loginName: row.LOGINNAME,
    role: row.ROLE
  };
  var token = jwt.sign(claims, process.env.SECRET_KEY, { expiresIn: "10m" });

  // sending response
  res.status(201).json({
    jwt: token,
    expiresIn: "600", // token expires after 600 seconds => give this information to frontend
    message: "Success!",
    firstName: row.RU_FIRSTNAME,
    surname: row.RU_SURNAME,
    balance: row.BALANCE,
    currency: "UGX", // row.CURRENCY,
    role: row.ROLE,
    language: row.LANGUAGE
  });
}
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.createUser = function(req, res) {
  console.log("UserController createUser Start");
  // check for user existance
  DBService.getUserByName(req.body.loginName, function(err, result) {
    if (err && err != "No Results found!") {
      console.log(err);
      console.log("UserController createUser sending Response...");
      res.send(err);
    } else {
      if (result != null && result.length > 0) {
        console.log("UserController createUser sending Response...");
        res.status(401).send(new Error("User already exists!"));
      } else {
        var data = [
          new Date(),
          req.body.loginName,
          req.body.password,
          req.body.firstName,
          req.body.lastName,
          0,
          0,
          1,
          "UG", // req.body.country
          1,
          "en", // req.body.language
          new Date(0)
        ];

        DBService.createUser(data, function(err, result) {
          if (err) {
            console.log(err);
            console.log("UserController createUser sending Response...");
            res.send(err);
          } else {
            console.log("UserController createUser sending Response...");
            res.status(201).json({
              message: "User successfully created!"
            });
          }
        });
      }
    }
  });
};
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.getUser = function(req, res) {
  console.log("UserController getUser Start");
  console.log(req.body);
  if (req.body.loginName) {
    DBService.getUserByName(req.body.loginName, function(err, result) {
      if (err) {
        console.log(err);
        console.log("UserController getUser sending Response...");
        res.send(err);
      } else {
        var row = result[0];
        if (row.LOCKED == 0) {
          if (row.PASSWORD == req.body.password) {
            console.log("UserController getUser sending Response...");
            sendUserData(result[0], res);
          } else {
            console.log("UserController getUser sending Response...");
            res.status(401).send(new Error("Wrong password!"));
          }
        } else {
          console.log("UserController getUser sending Response...");
          res.status(401).send(new Error("User has been locked!"));
        }
      }
    });
  } else {
    if (req.body.userId) {
      DBService.getUserById(req.body.userId, function(err, result) {
        if (err) {
          console.log(err);
          console.log("UserController getUser sending Response...");
          res.send(err);
        } else {
          var row = result[0];
          if (row.LOCKED == 0) {
            if (row.PASSWORD == req.body.password) {
              console.log("UserController getUser sending Response...");
              sendUserData(result[0], res);
            } else {
              console.log("UserController getUser sending Response...");
              res.status(401).send(new Error("Wrong password!"));
            }
          } else {
            console.log("UserController getUser sending Response...");
            res.status(401).send(new Error("User has been locked!"));
          }
        }
      });
    }
  }
};
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.getUserBalance = function(req, res) {
  console.log("UserController getUserBalance Start");

  var token = jwt.verify(
    req.headers.authentication.split(" ")[1],
    process.env.SECRET_KEY
  );

  DBService.getUserById(token.userId, function(err, result) {
    if (err) {
      console.log(err);
      console.log("UserController getUserBalance sending Response...");
      res.send(err);
    } else {
      console.log("UserController getUserBalance sending Response...");
      res.status(201).json({
        message: "success",
        balance: result[0].BALANCE,
        currency: "UGX" //result[0].CURRENCY
      });
    }
  });
};
//-----------------------------------------------------//
