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

router.post("/signup", newUserSignup);
router.get("/verify/:token", emailVerification);
router.post("/resend", resendEmailVerToken);
router.post("/login", loginUser);
router.post("/recover", passwordResetRequest);
router.post("/reset", passwordReset);

module.exports = router;
