const Comment = require('../models/comments');
const AppError = require('../AppError');
const sendEmail = require('../services/emailService');

exports.createComment = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        const comment = new Comment({ title, description });
        if (comment.length === 0) {
            throw new AppError('Sorry, comment cannot be blank', 401);
        }
        await comment.save();
        const deliverCommentTo = process.env.ADMIN_ADDRESS;
        sendEmail(deliverCommentTo, title, description, process.env.SENDER_ADDRESS);
        return res.status(200).json({ comment })
    } catch (err) {
        next(err)
    }
};