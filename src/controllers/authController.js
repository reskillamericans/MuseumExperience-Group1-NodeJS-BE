const User = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.AUTHENTICATION_SECRET;
const expiry = Number(process.env.EXPIRY);
const { TokenModel } = require("./../models/tokens");
const { v4: uuidv4 } = require("uuid");
const { sendEmailAuth } = require("./../services/emailService");

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

              // create token
              TokenModel.create(
                {
                  userID: savedUser._id,
                  emailVerificationToken: uuidv4(),
                },
                (err, newToken) => {
                  if (err) return res.status(500).json({ err });

                  // send verification email: fill out to, subject, message
                  const messageConfig = {
                    to: savedUser.email,
                    subject: "Activate your Museum Experience Account Now",
                    html: `<p>You're just one click away from getting started with Museum Experience. All you need to do is verify your email address to activate your Museum Experience account. Click <a href="http://localhost:${process.env.PORT}/auth/verify/${newToken.emailVerificationToken}">here</a></p>`,
                  };

                  sendEmailAuth(messageConfig);

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
    let matchedToken = await TokenModel.findOne({ emailVerificationToken: req.params.token });

    if (!matchedToken)
      return res
        .status(401)
        .json({ message: "Token may be expired. If you can't login, please request another token." });

    let user = await User.findOne({ _id: matchedToken.userID });

    if (!user) return res.status(400).json({ message: "Could not find a user with this token." });

    if (user.emailVerified)
      return res.status(400).json({ message: "This account is already verified. Please log in." });

    user.emailVerified = true;
    user.save();

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

    if (user.isVerified) return res.status(403).json({ message: "This account is already verified. Please log in." });

    let oldToken = await TokenModel.findOne({ userID: user._id });

    if (oldToken) await oldToken.deleteOne();

    let newToken = await TokenModel.create({
      userID: user._id,
      emailVerificationToken: uuidv4(),
    });

    const messageConfig = {
      to: user.email,
      subject: "Activate your Museum Experience Account Now",
      html: `<p>You're just one click away from getting started with Museum Experience. All you need to do is verify your email address to activate your Museum Experience account. Click <a href="http://localhost:${process.env.PORT}/auth/verify/${newToken.emailVerificationToken}">here</a></p>`,
    };

    sendEmailAuth(messageConfig);

    res.status(200).json({ message: `A verification email has been sent to ${user.email}.` });
  } catch (err) {
    console.log(err);
    if (err) return res.status(500).json({ message: "Something went wrong. Please try again later" });
  }
};

exports.passwordResetRequest = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    let oldToken = await TokenModel.findOne({ userID: user._id });

    if (oldToken) await oldToken.deleteOne();

    TokenModel.create({
      userID: user._id,
      passwordResetToken: uuidv4(),
    });

    const messageConfig = {
      to: user.email,
      subject: "Forgot your password?",
      html: `<p>Click <a href="#">here</a> to reset your password.</p>`,
    };

    sendEmailAuth(messageConfig);

    return res.status(200).json({ message: `An email has been sent to ${user.email} with further instructions.` });
  } catch (err) {
    console.log(err);
    if (err) return res.status(500).json({ message: "Something went wrong. Please try again later" });
  }
};

exports.passwordReset = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    let passwordResetToken = TokenModel.findOne({ userID: user._id });

    if (!passwordResetToken)
      return res.status(401).json({ message: "Token may be expired. Please request another password reset token." });

    let hashedPassword = bcrypt.hashSync(req.body.newPassword, 10);

    user.password = hashedPassword;

    user.save();

    passwordResetToken.deleteOne();

    const messageConfig = {
      to: user.email,
      subject: "Password updated",
      html: `<p>Your password has been updated. Please login.</p>`,
    };

    sendEmailAuth(messageConfig);

    res.status(200).json({ message: "Password updated." });
  } catch (err) {
    console.log(err);
    if (err) return res.status(500).json({ message: "Something went wrong. Please try again later" });
  }
};
