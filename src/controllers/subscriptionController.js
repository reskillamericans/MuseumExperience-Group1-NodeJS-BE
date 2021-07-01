const Subscription = require("./../models/subscription");

// Exhibit subscription controller
exports.subscribeToExhibit = (req, res) => {
    req.body.userId = req.user.id
    Subscription.create({
        userId: req.user.id,
        exhibitId: req.body.exhibitId,
        status: req.body.status
    }, (err, newSubscription) => {
        if (err) {
            return res.status(500).json({ message: err });
        } else {
            return res.status(200).json({ message: "User successfully subscribed to exhibit!", newSubscription })
        }
    })
}


// Subscription cancellation contoller
exports.cancelSubscriptionToExhibit = (req, res) => {
    return null;
}