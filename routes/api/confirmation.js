const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

//Load user model
const User = require("../../models/User");

//Load Account Verification Token Model
const Token = require("../../models/Token");

//nodemail credentials
const EMAIL = require("../../config/keys").emailAddress;
const PASSWORD = require("../../config/keys").password;

//Load input validation
const validateVerificationInput = require("../../validation/confirmation");

//  @route GET api/confirmation/test
//  @desc Tests confirmation router
//  @access Public
router.get("/test", (req, res) => res.json({ msg: "Confirmationx Works" }));

//  @route GET api/confirmation/
//  @desc Verify User's Account
//  @access Publlic
router.get("/:token", (req, res) => {
  //find a matching token
  Token.findOne({
    token: req.params.token
  }).then(token => {
    if (!token) {
      return res.redirect("http://localhost:3000/token-expired");
    }

    //look for matching user
    User.findOne({
      _id: token.user
    }).then(user => {
      if (!user) {
        // return res
        //   .status(400)
        //   .json({ error: "We were unable to find a user for this token" });
        return res.redirect("http://localhost:3000/token-expired");
      } else if (user.isVerified) {
        // return res
        //   .status(400)
        //   .json({ error: "This user has already been verified" });
        return res.redirect("http://localhost:3000/token-expired");
      }
      //verify and save user
      user.isVerified = true;
      user
        .save()
        .then(user => res.redirect("http://localhost:3000/account-verified"))
        .catch(err => console.log(err));
    });
  });
});

//  @route GET api/confirmation/resent
//  @desc Resend Confirmation Token to User
//  @access Public
router.post("/resend", (req, res) => {
  const { errors, isValid } = validateVerificationInput(req.body);

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
    } else if (user.isVerified) {
      errors.email = "This account has already been verified. Please log in.";
      return res.status(400).json(errors);
    }

    //delete already exisitn token
    Token.findOneAndRemove({
      user: user._id
    }).then(console.log("Successfuly removed old token"));
    //create a new tokeen
    const token = new Token({
      user: user._id,
      token: crypto.randomBytes(16).toString("hex")
    });

    //generate verification token
    token
      .save()
      .then(token => {
        if (token) {
          //send a confirmation email
          const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 25,
            auth: {
              user: EMAIL,
              pass: PASSWORD
          ***REMOVED***
            tls: {
              rejectUnauthorised: false
            }
          });

          const mailOptions = {
            from: "no-reply@devconnector.com",
            to: user.email,
            subject: "Account Verification Token",
            text:
              `Hello ${user.name},\n\n` +
              "Please verify your account by clicking the link: \nhttp://" +
              req.headers.host +
              "/api/confirmation/" +
              token.token +
              ".\n"
          ***REMOVED***
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              return console.log(err);
            }
            console.log(info);
          });
        }
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
    return res.json({ msg: "A verification email has been sent" });
  });
});

module.exports = router;