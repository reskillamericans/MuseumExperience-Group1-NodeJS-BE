const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authentication');
const { subscribeToExhibit } = require('../controllers/subscriptionController');

router.post('/subscribe/exhibit/:id', authenticateUser ,subscribeToExhibit);

module.exports = router;