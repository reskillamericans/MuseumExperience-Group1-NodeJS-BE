const express = require('express');
const router = express.Router();
const { subscribeToExhibit } = require('../controllers/subscriptionController');

router.post('/subscribe/exhibit/:id', subscribeToExhibit);

module.exports = router;