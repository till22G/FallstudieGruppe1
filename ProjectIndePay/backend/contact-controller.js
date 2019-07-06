const DBService = require("./service");

//-----------------------------------------------------//
exports.createContact = function(req, res) {
  console.log("ContactController createContact ");

  var data = [req.body.userId, req.body.contactId];

  DBService.checkContact(data, function(err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      if (result.length > 0) {
        res.status(201).json({
          message: "Contact already exists!"
        });
      } else {
        data = [
          new Date(),
          req.body.userId,
          req.body.contactId,
          req.body.comment
        ];

        DBService.createContact(data, function(err, result) {
          if (err) {
            console.log(err);
            res.send(null, err);
          } else {
            res.status(201).json({
              message: "Contact successfully created!"
            });
          }
        });
      }
    }
  });
};
//-----------------------------------------------------//

//-----------------------------------------------------//
exports.getContacts = function (req, res) {
  console.log("ContactController getContacts ");

  DBService.getContacts(req.body.userId, function (err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(result);
    }
  })
}
//-----------------------------------------------------//
