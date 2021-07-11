const Comment = require('../models/comments');
const AppError = require('../AppError');
const sendEmail = require('../services/emailService');


exports.createComment = async (req, res, next) => {
    try {
        const { text } = req.body;
        const comment = new Comment({ text });
        if (comment.length === 0) throw new AppError('Sorry, comment cannot be blank', 401);
        await comment.save();
        const deliverCommentTo = process.env.ADMIN_ADDRESS;
        sendEmail(deliverCommentTo, text, process.env.SENDER_ADDRESS);
        return res.status(200).json({ comment })
    } catch (err) {
        next(err)
    }
};