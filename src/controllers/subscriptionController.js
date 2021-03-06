const Subscription = require("../models/subscription");
const User = require("../models/users");
const { ExhibitModel } = require("../models/exhibit");

// Exhibit subscription controller
exports.subscribeToExhibit = (req, res) => {
  ExhibitModel.findById(req.body.exhibit, (err, exhibit) => {
    if (err) {
      return res.status(404).json({ message: "Exhibit not found" });
    } else {
      Subscription.create(
        {
          user: req.user.id,
          exhibit: exhibit._id,
        },
        (err, newSubscription) => {
          if (err) {
            return res.status(500).json({ message: err });
          } else {
            User.findById(req.user.id, (err, user) => {
              if (err) {
                return res.status(500).json({ message: err });
              } else {
                if (user.subscriptions) {
                  user.subscriptions.push(newSubscription._id);
                } else {
                  user.subscriptions = [newSubscription._id];
                }

                user.save((err, savedUser) => {
                  if (err) {
                    console.log(savedUser);
                    console.log(err);
                    return res.status(500).json({ message: err });
                  } else {
                    console.log(savedUser);
                    return res.status(200).json({ message: "User subscribed successfully!", user });
                  }
                });
              }
            });
          }
        }
      );
    }
  });
};

// Subscription cancellation controller
exports.cancelSubscriptionToExhibit = (req, res) => {
  let subscriptionId = req.params.id;
  if (!req.body.status) {
    return res.status(400).json({ message: "Status value must be included to update subscription status" });
  }
  Subscription.findById(subscriptionId)
    .populate("user")
    .exec(function (err, subscription) {
      if (err) {
        return res.status(500).json({ message: err });
      } else if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      } else if (subscription.status === "cancelled") {
        return res.status(400).json({ message: "Subscription has already been cancelled for this exhibit" });
      } else {
        subscription.status = req.body.status;
        subscription.save((err, savedSubscription) => {
          if (err) {
            return res.status(500).json({ message: err });
          } else {
            let user = savedSubscription.user;
            user.subscriptions.pull(subscription._id);
            user.save((err, removedSubscription) => {
              if (err) {
                return res.status(500).json({ message: err });
              } else {
                return res.status(200).json({
                  message: "Subscription successfully cancelled and removed!",
                  savedSubscription,
                  removedSubscription,
                });
              }
            });
          }
        });
      }
    });
};

exports.fetchSubscribedExhibits = (req, res) => {
  Subscription.find({ status: "active", user: req.user.id })
    .populate("exhibit")
    .exec((err, exhibits) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else {
        return res.status(200).json({ exhibits });
      }
    });
};
