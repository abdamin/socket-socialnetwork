const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const axios = require("axios");

//Load Post Model
const Post = require("../../models/Post");
//Load Profile Model
const Profile = require("../../models/Profile");

//Validation
const validatePostInput = require("../../validation/post");

const API_URL = require("./config/keys").API_URL;

/*NOTE THAT A LOT OF THE POPULATE ARE NOT WRITTEN CLEANLY. 
  THEY CAN BE SHORTENED ALOT. ALL INTO ONE AND ONLY ONE CALL WITH SPACED STRINGS
*/

//  @route GET api/posts/test
//  @desc Tests posts router
//  @access Public
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

//  @route GET api/posts
//  @desc Get posts
//  @access Public
//note that here we use short cut of populate to get name and avatar of user model and handle of profile model
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .populate("user profile", ["name", "avatar", "handle"])
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No posts found" }));
});

//  @route GET api/posts/:id
//  @desc Get post by id
//  @access Public
//NOTE THAT another way (same result) of populating child attributes is commented out because we also have to do This is also different from doing populate by itself.
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .populate("user", ["name", "avatar"])
    .then(populatedPost =>
      populatedPost
        .populate("profile", ["handle"])
        .execPopulate()
        .then(fullPopulatedPost =>
          fullPopulatedPost
            .populate("comments.user comments.profile", [
              "name",
              "avatar",
              "handle"
            ])
            .execPopulate()
            .then(populatedComments => {
              res.json(populatedComments);
            })
        )
    )
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that id" })
    );

  // .populate({
  //   path: "user",
  //   select: "name avatar"
  // })
  // .execPopulate()
  // .then(post => {
  //   post
  //     .populate({
  //       path: "comments.user",
  //       select: "name avatar"
  //     })
  //     .execPopulate()
  //     .then(finalPost => {
  //       return res.json(finalPost);
  //     });
  // })
  // .catch(err =>
  //   res.status(404).json({ nopostfound: "No post found with that id" })
  // );
});

//  @route POST api/posts
//  @desc Create post
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
      user: req.user.id,
      profile: req.body.profile
    });

    newPost.save().then(newPost =>
      newPost
        .populate("user", ["name", "avatar"])
        .execPopulate()
        .then(post =>
          post
            .populate("profile", ["handle"])
            .execPopulate()
            .then(populatedPost => {
              //add to activities document
              const activityData = {
                type: "POST",
                detail: populatedPost.text,
                profile: populatedPost.profile._id
              };

              axios.defaults.headers.common["Authorization"] =
                req.headers.authorization;
              axios
                .post(`${API_URL}/api/activity/`, activityData)
                .then(response => {
                  console.log(response);
                  return res.json(populatedPost);
                })
                .catch(err => console.log(err));
            })
        )
    );
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

          post.save().then(newPost =>
            newPost
              .populate({
                path: "user profile",
                select: "name avatar handle"
              })
              .execPopulate()
              .then(post => {
                post
                  .populate({
                    path: "comments.user",
                    select: "name avatar"
                  })
                  .execPopulate()
                  .then(populatedPost => {
                    populatedPost
                      .populate({
                        path: "comments.profile",
                        select: "handle"
                      })
                      .execPopulate()
                      .then(finalPost => {
                        return res.json(finalPost);
                      });
                  });
              })
              .catch(err => console.log(err))
          );
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
          post.save().then(newPost =>
            newPost
              .populate({
                path: "user profile",
                select: "name avatar handle"
              })
              .execPopulate()
              .then(post => {
                post
                  .populate({
                    path: "comments.user",
                    select: "name avatar"
                  })
                  .execPopulate()
                  .then(populatedPost => {
                    populatedPost
                      .populate({
                        path: "comments.profile",
                        select: "handle"
                      })
                      .execPopulate()
                      .then(finalPost => {
                        return res.json(finalPost);
                      });
                  });
              })
              .catch(err => console.log(err))
          );
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
          user: req.user.id,
          profile: req.body.profile
        };

        //Add to comments array
        post.comments.unshift(newComment);

        //save
        // This is another way to populate by populating the result with name and avatar values of //user. Note that we also do sub population of the comment's user's name and avatar and another sub population of users profile
        //we also call execPopulate to run the population and return the result. This is required
        //in many cases such as after saving a document. Try using using execPopulate() or exec()
        // all the time for consistent results
        post.save().then(newPost =>
          newPost
            .populate({
              path: "user profile",
              select: "name avatar handle"
            })
            .execPopulate()
            .then(post => {
              post
                .populate({
                  path: "comments.user",
                  select: "name avatar"
                })
                .execPopulate()
                .then(populatedPost => {
                  populatedPost
                    .populate({
                      path: "comments.profile",
                      select: "handle"
                    })
                    .execPopulate()
                    .then(finalPost => {
                      return res.json(finalPost);
                    });
                });
            })
            .catch(err => console.log(err))
        );
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

        post.save().then(newPost =>
          newPost
            .populate({
              path: "user profile",
              select: "name avatar handle"
            })
            .execPopulate()
            .then(post => {
              post
                .populate({
                  path: "comments.user",
                  select: "name avatar"
                })
                .execPopulate()
                .then(populatedPost => {
                  populatedPost
                    .populate({
                      path: "comments.profile",
                      select: "handle"
                    })
                    .execPopulate()
                    .then(finalPost => {
                      return res.json(finalPost);
                    });
                });
            })
            .catch(err => console.log(err))
        );
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
