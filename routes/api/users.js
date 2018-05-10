const express = require("express");
const router = express.Router();
const superUser = require("../../config/super");
const keys = require("../../config/keys");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//load input validation
const validateLoginInput = require("../../validation/login");

//load user model
const User = require("../../models/User");

// @route  GET /api/users/test
// @desc   tests users route
// @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "yup user worked" });
});

// @route  GET /api/users/initialize
// @desc   initialize the super user
// @access Public
router.post("/initialize", (req, res) => {
  User.findOne({ email: superUser.email }).then(user => {
    if (user) {
      return res.status(400).json({
        mgs: "you're not allowed to be here, go away"
      });
    } else {
      const newUser = new User({
        email: superUser.email,
        name: superUser.name,
        password: superUser.password,
        role: superUser.role
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route  GET /api/users/login
// @desc   login the super user
// @access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //check for user
  User.findOne({ email: email }).then(user => {
    if (!user) {
      errors.email = "user not found, please go away";
      return res.status(400).json(errors);
    }

    //if user is found, compare password with bcrypt, then send a jwt payload
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched create jwt payload
        const payload = {
          id: user.id,
          email: user.email
        };

        //signed token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 1800 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route  GET /api/users/current
// @desc   get current user
// @access Private
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
