const express = require('express');
const router = express.Router();
const QuizCtrl = require('../controllers/questionsControllers')
//create question
router.post('/question', QuizCtrl.createNewQuestion);

//fetch questions
router.get('/question', QuizCtrl.fetchQuestions)

//fetch single question
router.get('/question/:id', QuizCtrl.fetchSingleQuestion);

module.exports = router;
