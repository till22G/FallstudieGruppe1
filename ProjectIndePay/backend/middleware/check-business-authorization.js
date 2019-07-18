const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("Check-Business-Authentication Start");

    const token = req.headers.authentication.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    // if the role is business or higher, we allow it, else we throw unauthorized error
    if (payload.role >= 2) {
      console.log("Check-Business-Authentication Success!");
      next();
    } else {
      console.log("Check-Business-Authentication Fail!");
      res.status(401).json({ message: "Authorization failed!" });
    }
  } catch (error) {
    console.log("Check-Business-Authentication Fail!");
    res.status(401).json({ message: "Authentication failed!" });
  }
};
