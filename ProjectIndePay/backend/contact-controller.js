const DBService = require("./service");
const jwt = require("jsonwebtoken");

//-----------------------------------------------------//
exports.createContact = function(req, res) {
  console.log("ContactController createContact ");
  DBService.getUserByName(req.body.contactLoginName, function(err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("ContactController createContact 1");
      console.log(result);
      var row = result[0];
      var token = jwt.verify(
        req.headers.authentication.split(" ")[1],
        process.env.SECRET_KEY
      );
      var data = [token.userId, row.USERID];

      DBService.checkContact(data, function(err, result) {
        if (err) {
          console.log(err);
          console.log("ContactController createContact sending Response...");
          res.send(err);
        } else {
          console.log("ContactController createContact 2");
          if (result.length > 0) {
            console.log("ContactController createContact sending Response...");
            res.status(401).json({
              message: "Contact already exists!"
            });
          } else {
            data = [new Date(), token.userId, row.USERID, req.body.comment];

            DBService.createContact(data, function(err, result) {
              if (err) {
                console.log(err);
                console.log("ContactController createContact sending Response...");
                res.send(null, err);
              } else {
                console.log("ContactController createContact sending Response...");
                res.status(201).json({
                  message: "Contact successfully created!"
                });
              }
            });
          }
        }
      });
    }
  });
};
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.getContacts = function(req, res) {
  console.log("ContactController getContacts ");

  var token = jwt.verify(
    req.headers.authentication.split(" ")[1],
    process.env.SECRET_KEY
  );
  var data = [token.userId];

  DBService.getContacts(data, function(err, results) {
    if (err) {
      console.log(err);
      console.log("ContactController getContacts sending Response...");
      res.send(err);
    } else {
      var returnObject = results.map(result => ({
        contactLoginName: result.LOGINNAME,
        comment: result.COMMENT
      }));
      console.log("ContactController getContacts sending Response...");
      res.status(201).json({
        contactList: returnObject
      });
    }
  });
};
//-----------------------------------------------------//
