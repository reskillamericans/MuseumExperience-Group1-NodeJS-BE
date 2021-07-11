const express = require('express');
const router = express.Router();
const CommentsCtrl = require('../controllers/commentsController');

// create a new comment
router.post('/comments', CommentsCtrl.createComment);

module.exports = router;