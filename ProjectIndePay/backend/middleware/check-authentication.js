const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log('check-auth called');
    // try to get the token out of the autorization header
    // token is the second part the name => therefore use split at whitespace to get it
    const token = req.headers.authentication.split(" ")[1];
    console.log(token);
    //verify the token with  jwt.verify()
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    // next(); // for testing in backend
    res.status(401).json({ message: "Authentication failed!" });
  }
};
// to add the middleware import with:
// const checkAuthentication = require("insert path to middleware here");
//
// add it after the path: e.g. post.put('', checkAuthentication, ....);
