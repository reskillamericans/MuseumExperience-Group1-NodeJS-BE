const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post('/signup', AuthController.newUserSignup);

module.exports = router;