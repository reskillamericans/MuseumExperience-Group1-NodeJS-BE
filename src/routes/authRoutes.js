const express = require("express");
const router = express.Router();
const {
  newUserSignup,
  emailVerification,
  resendEmailVerToken,
  loginUser,
  passwordResetRequest,
  passwordReset,
} = require("../controllers/authController");
const { checkIfEmailVerified } = require("./../middlewares/authentication");

router.post("/signup", newUserSignup);
router.get("/verify/:token", emailVerification);
router.post("/resend", resendEmailVerToken);
router.post("/login", checkIfEmailVerified, loginUser);
router.post("/recover", checkIfEmailVerified, passwordResetRequest);
router.post("/reset", passwordReset);

module.exports = router;
