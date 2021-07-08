const express = require("express");
const router = express.Router();
const { authenticateUser } = require('../middlewares/authentication');
const { fetchExhibits, fetchSingleExhibit } = require("./../controllers/exhibitController");
const { subscribeToExhibit, cancelSubscriptionToExhibit } = require('../controllers/subscriptionController');

router.get("/exhibits", fetchExhibits);
router.get("/exhibits/:id", fetchSingleExhibit);
router.post('/exhibit/:id/subscribe', authenticateUser, subscribeToExhibit);
router.put('/exhibit/:id/cancel-subscription', authenticateUser, cancelSubscriptionToExhibit);

exports.exhibitRoutes = router;