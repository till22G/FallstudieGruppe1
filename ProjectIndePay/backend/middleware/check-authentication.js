const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("Check-Authentication Start");
    // try to get the token out of the autorization header
    // token is the second part the name => therefore use split at whitespace to get it
    const token = req.headers.authentication.split(" ")[1];

    //verify the token with  jwt.verify()
    jwt.verify(token, process.env.SECRET_KEY);
    console.log("Check-Authentication Success!");
    next();
  } catch (error) {
    console.log("Check-Authentication Fail!");
    res.status(401).json({ message: "Authentication failed!" });
  }
};
