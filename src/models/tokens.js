const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  emailVerificationToken: {
    type: String,
  },
  passwordResetToken: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 3600,
  },
});

exports.TokenModel = mongoose.model("Token", tokenSchema);
