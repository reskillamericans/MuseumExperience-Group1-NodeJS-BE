const Subscription = require("./../models/subscription");
const User = require("./../models/users")
const Exhibit = require('./../models/exhibit');

// Exhibit subscription controller
exports.subscribeToExhibit = (req, res) => {
    Subscription.create({
        user: req.user.id,
        exhibit: req.body.exhibit,
        status: req.body.status
    }, (err, newSubscription) => {
        if (err) {
            return res.status(500).json({ message: err });
        } else {
            let conditions = {};
            if (req.query.id) {
                conditions.id = req.query.id;
            }
            User.findById(req.user.id, (err, user) => {
                if (err) {
                    return res.status(500).json({ message: err });
                } else {
                    user.subscriptions.push(newSubscription.exhibit);
                    console.log(user);
                    return res.status(200).json({ message: "User successfully subscribed to exhibit!", newSubscription }); 
                }
            })
        }
    })
}


// Subscription cancellation contoller
exports.cancelSubscriptionToExhibit = (req, res) => {
    Subscription.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, subscription) => {
        if (err) {
            return res.status(500).json({message: err});
        } else if (!subscription) {
            return res.status(404).json({message: 'Subscription not found'});
        } else {
            subscription.save((err, savedSubscription) => {
                if (err) {
                    return res.status(400).json({message: err});
                } else if (subscription.status === "cancelled") {
                    return res.status(401).json({ message: "Subscription is already cancelled"})
                } else {
                    return res.status(200).json({message: 'Subscription successfully cancelled!', subscription});
                }
            });
        }
    })
    return null;
}