const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {

  try {
    // try to get the token out of the autorization header
    // token is the second part the name => therefore use split to get it
    const token = req.headers.authorization.split(" ")[1];
    //verify the token with  jwt.verify()
    // TODO: insert creation string
    jwt.verify(token, "insert string with which token was created here");
    next();
  }
  catch (error){
    res.status(401).json({ message: "authentication failed!"});
  }
}


// to add the middleware import with:
// const checkAuthentication = require("insert path to middleware here");
//
// add it after the path: e.g. post.put('', checkAuthentication, ....);
