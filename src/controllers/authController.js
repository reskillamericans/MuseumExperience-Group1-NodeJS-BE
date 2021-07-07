const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.AUTHENTICATION_SECRET;
const expiry = Number(process.env.EXPIRY);
const { TokenModel } = require("./../models/tokens");
const { v4: uuidv4 } = require("uuid");
const sendEmail = require("./../services/emailService");
const moment = require("moment");
moment().format();

exports.newUserSignup = (req, res) => {
  User.findOne({ email: req.body.email }, (err, existingUser) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (existingUser) {
      return res.status(400).json({ message: "A user with this email already exists" });
    }
    User.create(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        dateOfBirth: req.body.dateOfBirth,
      },
      (err, newUser) => {
        if (err) {
          return res.status(500).json({ err });
        }

        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            return res.status(500).json({ err });
          }
          bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
            if (err) {
              return res.status(500).json({ err });
            }
            newUser.password = hashedPassword;
            newUser.save((err, savedUser) => {
              if (err) {
                return res.status(500).json({ err });
              }

              TokenModel.create(
                {
                  userID: savedUser._id,
                  token: uuidv4(),
                  expiresIn: moment().add(1, "hours"),
                  tokenType: "email-verification",
                },
                (err, newToken) => {
                  if (err) return res.status(500).json({ err });

                  const to = savedUser.email;
                  const subject = "Activate your Museum Experience Account Now";
                  const html = `<p>You're just one click away from getting started with Museum Experience. All you need to do is verify your email address to activate your Museum Experience account. Click <a href="http://localhost:${process.env.PORT}/auth/verify/${newToken.token}">here</a></p>`;

                  sendEmail(to, subject, html);

                  return res.status(200).json({ message: `A verification email has been sent to ${newUser.email}.` });
                }
              );
            });
          });
        });
      }
    );
  });
};

exports.loginUser = (req, res) => {
  User.findOne({ email: req.body.email }, (err, foundUser) => {
    if (err) {
      return res.status(500).json({ err });
    }
    if (!foundUser) {
      return res.status(401).json({ message: "Incorrect email or password. Please try again." });
    }
    let match = bcrypt.compareSync(req.body.password, foundUser.password);

    if (!match) {
      return res.status(401).json({ message: "Incorrect email or password. Please try again." });
    }

    jwt.sign(
      {
        id: foundUser._id,
        email: foundUser.email,
        dateOfBirth: foundUser.dateOfBirth,
      },
      secret,
      { expiresIn: expiry },
      (err, token) => {
        if (err) {
          return res.status(500).json({ err });
        }
        return res.status(200).json({ message: `${foundUser.email} logged in successfully!`, token });
      }
    );
  });
};

exports.emailVerification = async (req, res) => {
  try {
    let token = await TokenModel.findOne({ token: req.params.token });

    if (token.expired)
      return res
        .status(401)
        .json({ message: "Token may be expired. If you can't login, please request another token." });

    if (moment(token.expiresIn) < moment()) {
      token.expired = true;
      await token.save();

      return res
        .status(401)
        .json({ message: "Token may be expired. If you can't login, please request another token." });
    }

    let user = await User.findOne({ _id: token.userID });

    if (!user) return res.status(400).json({ message: "Could not find a user with this token." });

    if (user.emailVerified)
      return res.status(400).json({ message: "This account is already verified. Please log in." });

    user.emailVerified = true;
    await user.save();

    await TokenModel.updateMany({ userID: user._id }, { expired: true });

    return res.status(200).json({ message: "You account has been verified! Please log in." });
  } catch (err) {
    console.log(err);
    if (err) return res.status(500).json({ message: "Something went wrong. Please try again later" });
  }
};

exports.resendEmailVerToken = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).json({ message: "We were unable to find a user with that email." });

    if (user.emailVerified)
      return res.status(403).json({ message: "This account is already verified. Please log in." });

    let newToken = await TokenModel.create({
      userID: user._id,
      token: uuidv4(),
      expiresIn: moment().add(1, "hours"),
      tokenType: "email-verification",
    });

    const to = user.email;
    const subject = "Activate your Museum Experience Account Now";
    const html = `<p>You're just one click away from getting started with Museum Experience. All you need to do is verify your email address to activate your Museum Experience account. Click <a href="http://localhost:${process.env.PORT}/auth/verify/${newToken.token}">here</a></p>`;

    sendEmail(to, subject, html);

    res.status(200).json({ message: `A verification email has been sent to ${user.email}.` });
  } catch (err) {
    console.log(err);
    if (err) return res.status(500).json({ message: "Something went wrong. Please try again later" });
  }
};

exports.passwordResetRequest = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    let token = await TokenModel.create({
      userID: user._id,
      token: uuidv4(),
      expiresIn: moment().add(1, "hours"),
      tokenType: "password-reset",
    });

    const to = user.email;
    const subject = "Forgot your password?";
    const html = `<p>Click <a href="reset-form-with-token">here</a> to reset your password.</p>`;

    sendEmail(to, subject, html);

    return res
      .status(200)
      .json({ message: `An email has been sent to ${user.email} with further instructions.`, token: token.token });
  } catch (err) {
    console.log(err);
    if (err) return res.status(500).json({ message: "Something went wrong. Please try again later" });
  }
};

exports.passwordReset = async (req, res) => {
  try {
    let token = await TokenModel.findOne({ token: req.body.token });

    if (!token)
      return res
        .status(401)
        .json({ message: "Token may be expired. If you can't login, please request another token." });

    if (token.expired)
      return res
        .status(401)
        .json({ message: "Token may be expired. If you can't login, please request another token." });

    if (moment(token.expiresIn) < moment()) {
      token.expired = true;
      await token.save();

      return res
        .status(401)
        .json({ message: "Token may be expired. If you can't login, please request another token." });
    }

    let user = await User.findOne({ _id: token.userID });

    if (!user) return res.status(500).json({ message: "Something went wrong. Please try again later" });

    token.expired = true;
    await token.save();

    let hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    await TokenModel.updateMany({ userID: user._id }, { expired: true });

    const to = user.email;
    const subject = "Password updated";
    const html = `<p>Your password has been updated. Please login.</p>`;

    sendEmail(to, subject, html);

    res.status(200).json({ message: "Password updated. Please login." });
  } catch (err) {
    console.log(err);
    if (err) return res.status(500).json({ message: "Something went wrong. Please try again later" });
  }
};
