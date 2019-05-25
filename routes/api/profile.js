const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const cloudinary = require("cloudinary");
const multer = require("multer");
const path = require("path");
const axios = require("axios");

//Load Validation
const validateProfileInput = require("../../validation/profile");
const validateExperienceInput = require("../../validation/experience");
const validateEducationInput = require("../../validation/education");
const validateSocialInput = require("../../validation/social");

const AVATARPLACEHOLDERURL = require("../../config/keys").avatarPlaceholderUrl;

//cloudinary config
const CLOUDINARY_CONFIG = require("../../config/keys").cloudinary;
cloudinary.config(CLOUDINARY_CONFIG);

//api url config
const API_URL = require("./config/keys").API_URL;

//Load Profile Model
const Profile = require("../../models/Profile");
//Load User Model
const User = require("../../models/User");

// Set The Multer Storage Engine
const multerStorage = multer.diskStorage({
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

// Check Multer Upload File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error("Upload an image"), false);
  }
}

// Init Multer Upload
const multerUpload = multer({
  storage: multerStorage,
  limits: { fileSize: 5000000, files: 1 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
}).single("image");

//  @route GET api/profile/test
//  @desc Tests profile router
//  @access Public
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

//  @route POST api/profile/uploadProfileImage
//  @desc Upload User Profile Avatar Image
//  @access Private
router.post(
  "/uploadProfileImage",
  passport.authenticate("jwt", { session: false }),
  multerUpload,
  (req, res) => {
    res.setHeader("Content-Type", "application/json");
    //if no image was selected
    if (req.file == undefined) {
      return res.status(400).json({ error: "No image was selected" });
    }

    //delete any existing profile image of user from cloud before uploading any
    cloudinary.v2.uploader.destroy(req.user.id, (error, result) => {
      if (error) {
        return res.status(400).json({ Error: "error removing image" });
      }

      //upload new image
      cloudinary.v2.uploader.upload(
        req.file.path,
        {
          public_id: req.user.id,
          quality: "auto:eco",
          width: "400",
          height: "400"
      ***REMOVED***
        (error, result) => {
          if (error) {
            console.log(error);
            return res.status(400).json({ Error: "Error Uploading Image" });
          }

          const avatar = result.secure_url;
          console.log(result);

          User.findOne({
            _id: req.user.id
          }).then(user => {
            if (!user) {
              return res.status(400).json({ Error: "Error uploading image" });
            } else {
              //add image url to db
              user.avatar = avatar;
              user.save().then(user => {
                //add to user activities
                //add to activities document
                //first find the relevant profile to get user's profile id

                Profile.findOne({ user: req.user.id }).then(profile => {
                  const activityData = {
                    type: "IMAGE",
                    detail: "Updated",
                    profile: profile._id
                  ***REMOVED***

                  axios.defaults.headers.common["Authorization"] =
                    req.headers.authorization;
                  axios
                    .post(`${API_URL}/api/activity/`, activityData)
                    .then(response => {
                      return res.status(200).json({ avatarUrl: avatar });
                    })
                    .catch(err => console.log(err));
                });
              });
            }
          });
        }
      );
    });
  }
);

//  @route POST api/profile/removeProfileImage
//  @desc Remove User Profile Avatar Image
//  @access Private
router.post(
  "/removeProfileImage",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    cloudinary.v2.uploader.destroy(req.user.id, (error, result) => {
      if (error) {
        return res.status(400).json({ Error: "error removing image" });
      }

      User.findOne({
        _id: req.user.id
      }).then(user => {
        if (!user) {
          return res.status(400).json({ error: "Error Removing image" });
        } else {
          //add image url to db
          user.avatar = AVATARPLACEHOLDERURL;
          user.save().then(user => {
            return res.status(200).json({ avatarUrl: AVATARPLACEHOLDERURL });
          });
        }
      });
    });
  }
);

//  @route GET api/profile/
//  @desc Get Current User's Profile
//  @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let errors = {***REMOVED***
    Profile.findOne({ user: req.user.id })
      //add user name and avatar data from the user schema to the returned result as well
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  }
);

//  @route GET api/profile/all
//  @desc Get all Profiles
//  @access Public
router.get("/all", (req, res) => {
  let errors = {***REMOVED***

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }

      res.json(profiles);
    })
    .catch(err => {
      res.status(404).json({ profile: "There are no profiles" });
    });
});

//  @route GET api/profile/handle/:handle
//  @desc Get User's Profile by handle
//  @access Public
router.get("/handle/:handle", (req, res) => {
  let errors = {***REMOVED***

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});

//  @route GET api/profile/user/:user_id
//  @desc Get User's Profile by User ID
//  @access Public
router.get("/user/:user_id", (req, res) => {
  let errors = {***REMOVED***

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user";
        res.status(404).json(errors);
      }

      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "There is no profile for this user" })
    );
});

//  @route POST api/profile/
//  @desc Create or Edit User's Profile
//  @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    //Check Validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    //Get fields
    const profileFields = {***REMOVED***
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername) {
      profileFields.githubusername = req.body.githubusername;
    }
    //Skills - Split into an array (Because we receive CSVs (Comma Separated Values for skills))
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
    // //Social initialize first becuase social will be an object that we receive
    // profileFields.social = {***REMOVED***
    // if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    // if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    // if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    // if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    // if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    //NOTE THAT THESE QUERIES ARE IN IF ELSE BRANCHES BECUASE MONGOOSE CALLS ARE ASYNC AND THEY ALL CAN BE RUN AT THE SAME TIME SO TO AVOID BOTH CALLS TOGETHER, IN THIS CASE WE USE IF ELSE
    //Check if someother user has this handle
    Profile.findOne({
      user: { $ne: req.user.id },
      handle: profileFields.handle
    }).then(profile => {
      if (profile) {
        errors.handle = "That handle already exists";
        handleExists = true;
        return res.status(400).json(errors);
      } else {
        //else find the user profile and if it exists update it
        Profile.findOne({ user: req.user.id }).then(profile => {
          if (profile) {
            //Update Profile
            Profile.findOneAndUpdate(
              { user: req.user.id },
              { $set: profileFields },
              { new: true }
            ).then(profile => res.json(profile));
          } else {
            //Create profile if it does not exist

            Profile.findOne({ handle: profileFields.handle }).then(profile => {
              if (profile) {
                errors.handle = "That handle already exists";
                return res.status(400).json(errors);
              }

              //Save profile if handle does not already exist
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
            });
          }
        });
      }
    });
  }
);

//  @route POST api/profile/social
//  @desc Create or Edit User's Profile Social Links
//  @access Private
router.post(
  "/social",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSocialInput(req.body);

    //Check Validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    const profileFields = {***REMOVED***
    profileFields.user = req.user.id;

    //Social initialize first becuase social will be an object that we receive
    profileFields.social = {***REMOVED***
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    //NOTE THAT THESE QUERIES ARE IN IF ELSE BRANCHES BECUASE MONGOOSE CALLS ARE ASYNC AND THEY ALL CAN BE RUN AT THE SAME TIME SO TO AVOID BOTH CALLS TOGETHER, IN THIS CASE WE USE IF ELSE
    //Check if someother user has this handle

    //else find the user profile and if it exists update it
    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        //Update Profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create profile if it does not exist

        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          //Save profile if handle does not already exist
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

//  @route POST api/profile/experience
//  @desc Add experience to user's profile
//  @access Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    //Check Validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      ***REMOVED***

      //Add to experience array -- not push() because that will add it to the end so we do unshift() to add it to the beginning
      profile.experience.unshift(newExp);

      profile.save().then(profile => {
        //add to activities document
        const activityData = {
          type: "EXPERIENCE",
          detail: newExp.company,
          profile: profile._id
        ***REMOVED***

        axios.defaults.headers.common["Authorization"] =
          req.headers.authorization;
        axios
          .post(`${API_URL}/api/activity/`, activityData)
          .then(response => {
            console.log(response);
            return res.json(profile);
          })
          .catch(err => console.log(err));
      });
    });
  }
);

//  @route POST api/profile/education
//  @desc Add education to user's profile
//  @access Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    //Check Validation
    if (!isValid) {
      //Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      ***REMOVED***

      //Add to education array -- not push() because that will add it to the end so we do unshift() to add it to the beginning
      profile.education.unshift(newEdu);

      profile.save().then(profile => {
        //add to activities document
        const activityData = {
          type: "EDUCATION",
          detail: newEdu.school,
          profile: profile._id
        ***REMOVED***

        axios.defaults.headers.common["Authorization"] =
          req.headers.authorization;
        axios
          .post(`${API_URL}/api/activity/`, activityData)
          .then(response => {
            console.log(response);
            return res.json(profile);
          })
          .catch(err => console.log(err));
      });
    });
  }
);

//  @route DELETE api/profile/experience/:exp_id
//  @desc Delete Experience from user's profile
//  @access Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        //Splice out of array
        profile.experience.splice(removeIndex, 1);

        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//  @route DELETE api/profile/education/:edu_id
//  @desc Delete Education from user's profile
//  @access Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        //Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        //Splice out of array
        profile.education.splice(removeIndex, 1);

        //save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

//  @route DELETE api/profile
//  @desc Delete user and profile
//  @access Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findByIdAndRemove({ _id: req.user.id }).then(() =>
        res.json({ sucess: "true" })
      );
    });
  }
);

module.exports = router;
