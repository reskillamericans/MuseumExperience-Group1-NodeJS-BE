const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middlewares/authentication");
const { fetchExhibits, fetchSingleExhibit } = require("./../controllers/exhibitController");
const {
  subscribeToExhibit,
  cancelSubscriptionToExhibit,
  fetchSubscribedExhibits,
} = require("../controllers/subscriptionController");

router.get("/exhibits", fetchExhibits);
router.get("/exhibits/subscriptions", authenticateUser, fetchSubscribedExhibits);
router.get("/exhibits/:id", fetchSingleExhibit);
router.post("/exhibits/subscribe", authenticateUser, subscribeToExhibit);
router.put("/exhibits/:id/cancel-subscription", authenticateUser, cancelSubscriptionToExhibit);

exports.exhibitRoutes = router;
