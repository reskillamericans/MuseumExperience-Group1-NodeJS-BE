const jwt = require("jsonwebtoken");
const secret = process.env.AUTHENTICATION_SECRET;
const User = require("../models/users");

exports.authenticateUser = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header required" });
  }

  let splitHeader = req.headers.authorization.split(" ");

  let bearer = splitHeader[0];

  if (bearer !== "Bearer") {
    return res.status(401).json({ message: "Authorization format is Bearer <token>" });
  }

  let token = splitHeader[1];

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid authorization token. Please login." });
    }
    req.user = decodedToken;
    next();
  });
};

exports.checkIfEmailVerified = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (!user.emailVerified) return res.status(401).json({ message: "Your account has not been verified." });
  } catch (err) {
    console.log(err);
    if (err) return res.status(500).json({ message: "Something went wrong. Please try again later" });
  }

  next();
};
