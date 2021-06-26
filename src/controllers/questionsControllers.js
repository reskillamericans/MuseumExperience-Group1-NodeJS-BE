const Question = require('../models/questions')
//create a new question
exports.createNewQuestion = async (req, res) => {
  try {
    const createQuiz = await Question.create({
      ...req.body
    }).exec();
    if (newQuestion) return res.status(200).json({ newQuestion })
  } catch (err) {
    if (err) return res.status(500).json({ message: 'An error occurred', err })
  }
};


//fetch all questions
exports.fetchQuestions = async (req, res) => {
  try {
    let quizConditions = {};
    if (req.query.title) {
      quizConditions.title = req.query.title;
    }
    if (req.query.user) {
      quizConditions.user = req.query.user;
    }
    const fetchQuiz = await Question.find({}).exec();
    return res.status(200).json({ questions })
  } catch (err) {
    if (err) return res.status(500).json({ message: 'Sorry, an error occurred', err })
  }

  //fetch a single question
  exports.fetchSingleQuestion = async (req, res) => {
    try {
      const singleQuiz = await Question.findById(req.params.id).exec();
      if (!question) {
        return res.status(404).json({ message: 'Sorry, question not found' })
      }
      return res.status(200).json({ question });
    } catch (err) {
      if (err) return res.status(500).json({ message: 'Sorry, an error occurred', err })
    }
  }
};

