const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const passport = require("passport");

//set up sendgrid mail
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(require("../../config/keys").sendgrid_api_key);

//load email template
const passwordChangeEmailTemplate = require("../../emailTemplates/passwordChange");

//front end api url config
const FRONT_API_URL = require("../../config/keys").FRONT_API_URL;

//Load user model
const User = require("../../models/User");

//Load Account Verification Token Model
const Token = require("../../models/Token");

//nodemail credentials
const EMAIL = require("../../config/keys").emailAddress;
const PASSWORD = require("../../config/keys").password;

//Load input validation
const validatePasswordInput = require("../../validation/passwordChange");
const validateEmailInput = require("../../validation/confirmation");
const validateProfilePasswordChangeInput = require("../../validation/profilePasswordChange");

//  @route GET api/confirmation/test
//  @desc Tests confirmation router
//  @access Public
router.get("/test", (req, res) => res.json({ msg: "Password Change Works" }));

//  @route GET api/passwordChange/
//  @desc Verify User's Password Change Token
//  @access Publlic
router.get("/:token", (req, res) => {
  //find a matching token
  Token.findOne({
    token: req.params.token,
    type: "password"
  }).then(token => {
    if (!token) {
      return res.status(400).json({ response: "This link has expired" });
      //return res.redirect("http://localhost:3000/token-expired");
    }

    //look for matching user
    User.findOne({
      _id: token.user
    }).then(user => {
      if (!user) {
        return res
          .status(400)
          .json({ response: "We were unable to find a user for this token" });
        //return res.redirect("http://localhost:3000/token-expired");
      }
      return res
        .status(200)
        .json({ response: "Link Verified. You may change your password" });
    });
  });
});

//  @route post api/passwordChange/:token
//  @desc Change User's Account Password through reset email method
//  @access Publlic
router.post("/:token", (req, res) => {
  //find a matching token
  Token.findOne({
    token: req.params.token,
    type: "password"
  }).then(token => {
    if (!token) {
      return res.status(400).json({ response: "This link has expired" });
      //return res.redirect("http://localhost:3000/token-expired");
    }

    //look for matching user
    User.findOne({
      _id: token.user
    }).then(user => {
      if (!user) {
        return res.status(400).json({ response: "This link has expired" });
        //return res.redirect("http://localhost:3000/token-expired");
      } else {
        //change user password
        const data = {
          password: req.body.password,
          password2: req.body.password2
        };

        const { errors, isValid } = validatePasswordInput(data);
        //Check validation
        if (!isValid) {
          return res.status(400).json(errors);
        }

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(data.password, salt, (err, hash) => {
            if (err) {
              throw err;
            }
            user.password = hash;
            user
              .save()
              .then(user => {
                Token.findOneAndRemove({
                  user: user._id,
                  type: "password"
                })
                  .then(token => console.log("removed token"))
                  .catch(err => console.log(err));
                return res
                  .status(200)
                  .json({ response: "Password Changed Succesfully" });
              })
              .catch(err => {
                return console.log(err);
              });
          });
        });
      }
    });
  });
});

//  @route post api/passwordChange/profile
//  @desc Change User's Account password from profile settings
//  @access Publlic
router.post(
  "/profile/password",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //look for matching user
    User.findOne({
      _id: req.user.id
    }).then(user => {
      if (!user) {
        return res.status(400).json({ response: "No User found" });
      } else {
        const data = {
          currentPassword: req.body.currentPassword,
          password: req.body.password,
          password2: req.body.password2
        };

        const { errors, isValid } = validateProfilePasswordChangeInput(data);
        //Check validation
        if (!isValid) {
          return res.status(400).json(errors);
        }

        //check if old password matches
        bcrypt
          .compare(req.body.currentPassword, user.password)
          .then(isMatch => {
            if (isMatch) {
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(data.password, salt, (err, hash) => {
                  if (err) {
                    throw err;
                  }
                  user.password = hash;
                  user
                    .save()
                    .then(user => {
                      return res
                        .status(200)
                        .json({ response: "Password Changed Succesfully" });
                    })
                    .catch(err => {
                      return console.log(err);
                    });
                });
              });
            } else {
              errors.currentPassword = "Password incorrect";
              return res.status(400).json(errors);
            }
          });
      }
    });
  }
);

//  @route POST api/passwordChange/send
//  @desc Send Password Change Token to User
//  @access Public
router.post("/user/send", (req, res) => {
  const { errors, isValid } = validateEmailInput(req.body);

  //Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;

  User.findOne({
    email: email
  }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(400).json(errors);
    }

    //delete already existing token
    Token.findOneAndRemove({
      user: user._id,
      type: "password"
    }).then(console.log("Successfuly removed old password token"));
    //create a new tokeen
    const token = new Token({
      user: user._id,
      type: "password",
      token: crypto.randomBytes(16).toString("hex")
    });

    //generate verification token
    token
      .save()
      .then(token => {
        if (token) {
          // //send a password change email using node mailer
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
          //   to: user.email,
          //   subject: "Account Password Change Instructions",
          //   text:
          //     `Hello ${user.name},\n\n` +
          //     "You are receiving this email because you (or someone else) have requested to reset the password of your account.\n" +
          //     `Please click on this link or paste this link into your browser to change your account password: \n ${FRONT_API_URL}` +
          //     "/change-password/" +
          //     token.token +
          //     ".\n" +
          //     "If you did not request this, please ignore this email.\n"
          // };
          // transporter.sendMail(mailOptions, (err, info) => {
          //   if (err) {
          //     return console.log(err);
          //   }
          //   console.log(info);
          // });

          const msg = {
            to: user.email,
            from: "no-reply@socket.com",
            subject: "Socket - Password Change Instructions",
            text:
              `Hello ${user.name},\n\n` +
              "You are receiving this email because you have requested to reset the password of your account.\n" +
              `Please click on this link or paste this link into your browser to change your account password: \n ${FRONT_API_URL}` +
              "/change-password/" +
              token.token +
              ".\n" +
              "If you did not request this, please ignore this email.\n",
            html: passwordChangeEmailTemplate(
              user,
              FRONT_API_URL + "/change-password/" + token.token
            )
          };
          sgMail
            .send(msg)
            .then(response => console.log(response))
            .catch(err => console.log(err.message));
        }
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
    return res.json({
      msg: "Password Change instructions have been sent to your email address."
    });
  });
});

module.exports = router;
