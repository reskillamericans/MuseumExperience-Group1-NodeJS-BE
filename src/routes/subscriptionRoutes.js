const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authentication');
const { subscribeToExhibit, cancelSubscriptionToExhibit } = require('../controllers/subscriptionController');

router.post('/subscribe/exhibit/:id', authenticateUser, subscribeToExhibit);
router.put('/cancel-subscription/:id', authenticateUser, cancelSubscriptionToExhibit);

exports.subscriptionRoutes = router;