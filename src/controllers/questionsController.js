const Question = require("../models/questions");
const AppError = require("../AppError");
const sendEmail = require("../services/emailService");

exports.fetchQuestions = async (req, res, next) => {
  try {
    let filter = {};
    if (req.query.exhibit) {
      filter.exhibit = req.query.exhibit
    }
    const questions = await Question.find(filter);
    return res.status(200).json({ questions });
  } catch (err) {
    next(err);
  }
};

exports.createQuestion = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const question = new Question(req.body);
    await question.save();
    const deliverQuestionTo = process.env.ADMIN_ADDRESS;
    sendEmail(deliverQuestionTo, title, description, process.env.SENDER_ADDRESS);
    return res.status(200).json({ question });
  } catch (err) {
    next(err);
  }
};

exports.fetchSingleQuestion = async (req, res, next) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      throw new AppError("Question not found", 404);
    }
    return res.status(200).json({ question });
  } catch (err) {
    next(err);
  }
};
