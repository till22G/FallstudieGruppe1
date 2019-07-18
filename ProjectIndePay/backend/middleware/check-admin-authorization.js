const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    console.log("Check-Admin-Authorization Start");

    const token = req.headers.authentication.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    // if the role is admin or higher, we allow it, else we throw unauthorized error
    if (payload.role >= 3) {
      console.log("Check-Admin-Authorization Success!");
      next();
    } else {
      console.log("Check-Admin-Authorization Fail!");
      res.status(401).json({ message: "Authorization failed!" });
    }
  } catch (error) {
    console.log("Check-Admin-Authorization Fail!");
    res.status(401).json({ message: "Authentication failed!" });
  }
};
