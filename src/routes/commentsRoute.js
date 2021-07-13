const express = require('express');
const router = express.Router();
const CommentsCtrl = require('../controllers/commentsController');
const { requireLogin } = require('../middlewares/requireLogin');


// create a new comment
router.post('/comments', requireLogin, CommentsCtrl.createComment);

module.exports = router;