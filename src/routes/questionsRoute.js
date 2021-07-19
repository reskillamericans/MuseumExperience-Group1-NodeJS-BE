const express = require("express");
const router = express.Router();
const QuizCtrl = require("../controllers/questionsController");
const { authenticateUser } = require("../middlewares/authentication");

//fetch questions
router.get("/questions", QuizCtrl.fetchQuestions);

// create a new question
router.post("/questions", authenticateUser, QuizCtrl.createQuestion);

//fetch details about a single question
router.get("/questions/:id", QuizCtrl.fetchSingleQuestion);

module.exports = router;
