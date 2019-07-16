const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log('check-authorizatoin called');
    // try to get the token out of the autorization header
    // token is the second part the name => therefore use split at whitespace to get it
    const token = req.headers.authentication.split(" ")[1];
    console.log(token);
    //verify the token with  jwt.verify()
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    if (payload.role >= 2){
      next();
    } else {
      res.status(401).json({ message: "Authorization failed!" });
    }
  } catch (error) {
    // next(); // for testing in backend
    res.status(401).json({ message: "Authentication failed!" });
  }
};
