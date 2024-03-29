const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// const nodemailer = require("nodemailer");
const crypto = require("crypto");

//load email template
const confirmationEmailTemplate = require("../../emailTemplates/confirmation");

//set up sendgrid mail
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(require("../../config/keys").sendgrid_api_key);

//front end api url config
const FRONT_API_URL = require("../../config/keys").FRONT_API_URL;

//nodemail credentials
const EMAIL = require("../../config/keys").emailAddress;
const PASSWORD = require("../../config/keys").password;
const AVATARPLACEHOLDERURL = require("../../config/keys").avatarPlaceholderUrl;

//Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//Load user model
const User = require("../../models/User");

//Load Profile Model
const Profile = require("../../models/Profile");

//Load Activity Model
const Activity = require("../../models/Activity");

//Load Account Verification Token Model
const Token = require("../../models/Token");

//  @route GET api/users/test
//  @desc Tests users router
//  @access Public
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

//  @route POST api/users/register
//  @desc Register User
//  @access Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = AVATARPLACEHOLDERURL;
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              //create a new tokeen
              const token = new Token({
                user: user._id,
                type: "verification",
                token: crypto.randomBytes(16).toString("hex")
              });

              //generate verification token
              token.save().catch(err => {
                if (err) {
                  throw err;
                }
              });

              // //send a confirmation email using node mailer
              // const transporter = nodemailer.createTransport({
              //   service: "gmail",
              //   port: 25,
              //   auth: {
              //     user: EMAIL,
              //     pass: PASSWORD
              //   },
              //   tls: {
              //     rejectUnauthorised: false
              //   }
              // });

              // const mailOptions = {
              //   from: "no-reply@devconnector.com",
              //   to: newUser.email,
              //   subject: "Account Verification Token",
              //   text:
              //     `Hello ${user.name},\n\n` +
              //     `Please verify your account by clicking the link: \n ${FRONT_API_URL}` +
              //     "/account-verify/" +
              //     token.token +
              //     ".\n"
              // };
              // transporter.sendMail(mailOptions, (err, info) => {
              //   if (err) {
              //     return console.log(err);
              //   }
              //   console.log(info);
              // });

              const msg = {
                to: newUser.email,
                from: "Socket <no-reply@socket.com>",
                subject: "Socket - Email Verification",
                text:
                  `Hello ${user.name},\n\n` +
                  `Please verify your account by clicking the link: \n ${FRONT_API_URL}` +
                  "/account-verify/" +
                  token.token +
                  ".\n",
                html: confirmationEmailTemplate(
                  user,
                  FRONT_API_URL + "/account-verify/" + token.token
                )
              };
              sgMail
                .send(msg)
                .then(response => console.log(response))
                .catch(err => console.log(err.message));

              //create a new profile with user id as profile handle by default upon registeration
              const profileFields = {
                user: user._id,
                handle: user._id,
                status: ""
              };
              new Profile(profileFields).save().then(profile => {
                //add to activities document the join date
                const newActivity = new Activity({
                  type: "JOINED",
                  detail: "date",
                  profile: profile._id,
                  user: user._id
                });

                newActivity
                  .save()
                  .then(activity => {
                    return res.json(user);
                  })
                  .catch(err => console.log(err));
              });
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//  @route GET api/users/login
//  @desc Login User //returning JWT (JSON Web Token)
//  @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find the user by email
  User.findOne({ email: email }).then(user => {
    //check for user
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }

    //check if the user is verified
    if (!user.isVerified) {
      errors.isVerified =
        "Your account has not been verified yet. Please check your email.";
      return res.status(401).json(errors);
    }

    //Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //Create JWT Payload

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token //get token on successful login
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//  @route GET api/users/current
//  @desc Return current user
//  @access Private    (PROTECTED ROUTER USING PASSPORT)
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
