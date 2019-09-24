const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Activity Model
const Activity = require("../../models/Activity");
//Load Profile Model
const Profile = require("../../models/Profile");

//Validation
const validateActivityInput = require("../../validation/activity");

//  @route GET api/posts/test
//  @desc Tests activity router
//  @access Public
router.get("/test", (req, res) => res.json({ msg: "Activity Works" }));

//  @route GET api/activity/profile/:id
//  @desc Get User's Activities by profile id
//  @access Public
router.get("/profile/:id", (req, res) => {
  let errors = {***REMOVED***

  Activity.find({ profile: req.params.id })
    .sort({ date: -1 })
    .populate("user profile", ["name", "avatar", "handle"])
    .then(activities => {
      if (!activities) {
        errors.noactivity = "There is no activity for this user";
        return res.status(404).json(errors);
      }

      res.json(activities);
    })
    .catch(err => res.status(404).json(err));
});

//  @route GET api/activity
//  @desc Get all activities
//  @access Public
router.get("/", (req, res) => {
  Activity.find()
    .sort({ date: -1 })
    .populate("user profile", ["name", "avatar", "handle"])
    .then(activities => res.json(activities))
    .catch(err =>
      res.status(404).json({ noactivitiesfound: "No activities found" })
    );
});

//  @route GET api/activity/:id
//  @desc Get activity by id
//  @access Public
router.get("/:id", (req, res) => {
  Activity.findById(req.params.id)
    .populate("user profile", ["name", "avatar", "handle"])
    .then(activity => res.json(activity))
    .catch(err =>
      res.status(404).json({ nopostfound: "No activity found with that id" })
    );
});

//  @route POST api/activity
//  @desc Create Activity
//  @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateActivityInput(req.body);

    //check validation
    if (!isValid) {
      //if any errors send 400 with errors object
      return res.status(400).json(errors);
    }

    //for avatar in react we will pull the name and the avatar from the state
    const newActivity = new Activity({
      type: req.body.type,
      detail: req.body.detail,
      user: req.user.id,
      profile: req.body.profile
    });

    newActivity.save().then(activity => {
      activity
        .populate("user", ["name", "avatar"])
        .execPopulate()
        .then(populatedActivity => res.json(populatedActivity));
    });
  }
);

//  @route DELETE api/activity/:id
//  @desc Delete Activity
//  @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Activity.findById(req.params.id)
        .then(activity => {
          //Check for activity owner
          if (activity.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorised: "User not authorised" });
          }

          //Delete
          activity
            .remove()
            .then(() => {
              return res.json({ success: "true" });
            })
            .catch(err => {
              return res.status(404).json({ postnotfound: "Post not found" });
            });
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

module.exports = router;
