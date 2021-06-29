const Question = require('../models/questions');

exports.fetchQuestions = async (req, res, next) => {
    try {
        const questions = await Question.find({});
        if (!questions) {
            throw new AppError('Questions not found', 404);
        }
        res.render('questions/index', { questions })
    } catch (err) {
        next(err)
    }
}

exports.fetchForm = (req, res) => {
    res.render('questions/new')
}

exports.createQuestion = async (req, res, next) => {
    try {
        const { title, description, user, answer, status } = req.body;
        const question = new Question(req.body);
        await question.save();
        res.redirect(`/questions/${question._id}`)
    } catch (err) {
        next(err)
    }
}

exports.fetchSingleQuestion = async (req, res, next) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            throw new AppError('Question not found', 404);
        }
        res.render('questions/details', { question })
    } catch (err) {
        next(err)
    }
}

