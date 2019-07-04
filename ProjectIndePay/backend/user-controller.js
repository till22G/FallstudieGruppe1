const DBService = require("./service");

const jwt = require("jsonwebtoken");

//-----------------------------------------------------//
function sendUserData(row, res){
  var claims = {
    userId    : row.USERID,
    loginName : row.LOGINNAME,
    role      : row.ROLE
  }
  var token = jwt.sign(claims, process.env.SECRET_KEY, {expiresIn: "10m" });

  // sending response
  res.status(201).json({
    jwt       : token,
    expiresIn : "600",  // token expires after 600 seconds => give this information to frontend
    message   : "Success!",
    firstName : row.RU_FIRSTNAME,
    surname   : row.RU_SURNAME,
    balance   : row.BALANCE,
    currency  : row.CURRENCY,
    role      : row.ROLE,
    language  : row.LANGUAGE
  });
}
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.createUser = function(req, res) {
  console.log("UserController createUser ");
  // check for user existance
  DBService.getUserByName(req.body.loginName, function(err, result) {
    if (err) {

      console.log(err);
      res.send(err);

    } else {

      console.log("UserController createUser RESULT = " + result);
      if (result != null && result.length > 0) {

        res.status(201).json({
          message: "User already exists!"
        });

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
          "GER", // @ToDo get real country from request
          1,
          "de", // @ToDo get real language from request
          new Date(0)
        ];

        DBService.createUser(data, function(err, result) {
          if (err) {

            console.log(err);
            res.send(err);

          } else {

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
  console.log("UserController getUser ");
  if (req.body.loginName){
    DBService.getUserByName(req.body.loginName, function(err, result) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        var row = result[0];
        if (row.LOCKED == 0){
          if (row.PASSWORD == req.body.password){
            sendUserData(result[0], res);
          } else {
            res.status(201).json({
              message: "Wrong password!"
            });
          }
        } else {
          res.status(201).json({
            message: "User has been locked!"
          });
        }
      }
    });
  } else {
    if (req.body.userId){
      DBService.getUserById(req.body.userId, function(err, result) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          var row = result[0];
        if (row.LOCKED == 0){
          if (row.PASSWORD == req.body.password){
            sendUserData(result[0], res);
          } else {
            res.status(201).json({
              message: "Wrong password!"
            });
          }
        } else {
          res.status(201).json({
            message: "User has been locked!"
          });
        }
        }
      });
    }
  }
};
//-----------------------------------------------------//
