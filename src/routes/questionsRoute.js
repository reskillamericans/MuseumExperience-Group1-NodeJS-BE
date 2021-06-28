const express = require('express');
const router = express.Router();
const QuizCtrl = require('../controllers/questionsController');

//fetch questions
router.get('/questions', QuizCtrl.fetchQuestions);

//get route to serve the form for posting new questions
router.get('/questions/new', QuizCtrl.fetchForm);

// create a new question
router.post('/questions', QuizCtrl.createQuestion);

//fetch details about a single question
router.get('/questions/:id', QuizCtrl.fetchSingleQuestion);

//error handler
router.use((err, req, res, next) => {
    const { status = 500, message = 'Sorry, something went wrong' } = err;
    res.status(status).send(message);
})

module.exports = router;