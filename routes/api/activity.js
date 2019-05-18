const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Activity Model
const Activity = require("../../models/Activity");
//Load Profile Model
const Profile = require("../../models/Profile");

//  @route GET api/posts/test
//  @desc Tests activity router
//  @access Public
router.get("/test", (req, res) => res.json({ msg: "Activity Works" }));

//  @route GET api/activity/handle/:handle
//  @desc Get User's Activities by handle
//  @access Public
router.get("/handle/:handle", (req, res) => {
  let errors = {};

  Activity.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .sort({ date: -1 })
    .then(activity => {
      if (!activity) {
        errors.noactivity = "There is no activity for this user";
        return res.status(404).json(errors);
      }

      res.json(activity);
    })
    .catch(err => res.status(404).json(err));
});

//  @route GET api/activity
//  @desc Get all activities
//  @access Public
router.get("/", (req, res) => {
  Activity.find()
    .sort({ date: -1 })
    .then(activities => res.json(activities))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

//  @route GET api/activity/:id
//  @desc Get activity by id
//  @access Public
router.get("/:id", (req, res) => {
  Activity.findById(req.params.id)
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
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      //if any errors send 400 with errors object
      return res.status(400).json(errors);
    }

    //for avatar in react we will pull the name and the avatar from the state
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
      handle: req.body.handle
    });

    newPost.save().then(post => res.json(post));
  }
);

//  @route DELETE api/posts/:id
//  @desc Delete post
//  @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorised: "User not authorised" });
          }

          //Delete
          post
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

//  @route POST api/posts/like/:id
//  @desc like post
//  @access Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check if user has liked already liked the post
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }
          //Add the user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

//  @route POST api/posts/unlike/:id
//  @desc unlike post
//  @access Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check if user has liked already has not like the post
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not yet liked this post" });
          }
          //Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //splice out of array
          post.likes.splice(removeIndex, 1);

          //Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
    });
  }
);

//  @route POST api/posts/comment/:id
//  @desc Add comment to post
//  @access Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    //check validation
    if (!isValid) {
      //if any errors send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
          handle: req.body.handle
        };

        //Add to comments array
        post.comments.unshift(newComment);

        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

//  @route DELETE api/posts/comment/:id/:comment_id
//  @desc Remove comment from post
//  @access Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        //Check if the comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        //Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //Splice out of array
        post.comments.splice(removeIndex, 1);

        //Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
