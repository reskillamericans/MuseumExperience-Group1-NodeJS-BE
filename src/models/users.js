const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date
  },
  emailVerified: {
    type: Boolean,
    default: "false",
  },
  subscriptions: [{ type: Schema.Types.ObjectId, ref: "Subscription" }],
});

module.exports = mongoose.model("User", userSchema);
