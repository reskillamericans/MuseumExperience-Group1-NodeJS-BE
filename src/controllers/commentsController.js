const Comment = require("../models/comments");
const AppError = require("../AppError");
const sendEmail = require("../services/emailService");

exports.createComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text) throw new AppError("Sorry, comment cannot be blank", 401);
    const comment = new Comment({ text });
    await comment.save();
    const deliverCommentTo = process.env.ADMIN_ADDRESS;
    const subject = "Comment";
    sendEmail(deliverCommentTo, subject, text, process.env.SENDER_ADDRESS);
    return res.status(200).json({ comment });
  } catch (err) {
    next(err);
  }
};
