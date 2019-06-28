const DBService = require("./service");

//-----------------------------------------------------//
exports.createUser = function (req, res) {
  console.log("UserController createUser ");
  // check for user existance
  var result = DBService.getUserByName(req.body.loginName, res);
  console.log("UserController createUser RESULT = " + result)
  if (result != null){
    res.status(201).json({
      message: "User already exists!"
    });
  } else {
    var data = [
    "SYS_CREATE_DATE",
    "LOGINNAME",
    "PASSWORD",
    "RU_FIRSTNAME",
    "RU_SURNAME",
    "LOCKED",
    "BALANCE",
    "CURRENCY",
    "COUNTRY",
    "ROLE",
    "LANGUAGE",
    "LAST_LOGIN_DATE",
    new Date(),
    req.body.loginName,
    req.body.password,
    req.body.firstName,
    req.body.lastName,
    0,
    0,
    0,
    "GER", // @ToDo get real country from request
    1,
    "de", // @ToDo get real language from request
    new Date(0)
    ];

    var result2 = DBService.createUser(data, res)
    if (result2 != null && result2 == true){
      res.status(201).json({
        message: "test1!"
      });
    } else {
      res.status(201).json({
        message: "test2!"
      });
    }
  }
}
//-----------------------------------------------------//

exports.getUser = function(req, res){
  console.log("UserController getUser ");

}
