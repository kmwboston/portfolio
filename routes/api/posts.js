const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//validator
const validatePostInput = require("../../validation/post");

//post model
const Post = require("../../models/Post");

//profile model
const Profile = require("../../models/Profile");

// @route  GET /api/posts/test
// @desc   test route
// @access Public
router.get("/test", (req, res) => {
  res.json({ msg: "yup post worked" });
});

// @route  GET /api/posts
// @desc   GET posts
// @access Public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ error: "no posts found" }));
});

// @route  GET /api/posts/:id
// @desc   GET post by the id
// @access Public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ error: "no post found with that id" })
    );
});

// @route  GET /api/posts/:seotitle
// @desc   GET post by the seo title
// @access Public
router.get("/:seotitle", (req, res) => {
  Post.findById(req.params.seotitle)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ error: "no post found with that title" })
    );
});

// @route  POST /api/posts/createPost
// @desc   create posts
// @access Private
router.post(
  "/createPost",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      //if any errors send 400 with messages
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      user: req.user.id,
      seotitle: req.body.seotitle,
      title: req.body.title,
      text: req.body.text,
      name: req.body.name
    });

    newPost.save().then(post => {
      res.json(post);
    });
  }
);

// @route   PUT api/post/:id
// @desc    Edit note
// @access  Private
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const postFields = {};
    if (req.body.seotitle) postFields.seotitle = req.body.seotitle;
    if (req.body.title) postFields.title = req.body.title;
    if (req.body.text) postFields.text = req.body.text;

    Post.findById(req.params.id).then(post => {
      if (post) {
        // Update
        Post.findByIdAndUpdate(
          req.params.id,
          { $set: postFields },
          { new: true }
        ).then(post => res.json(post));
      } else {
        res.status(400).json({ message: "didn't work for some reason" });
      }
    });
  }
);

// @route  DELETE /api/posts/:id
// @desc   Delete post by id
// @access Public
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authoriazed" });
          }

          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: "no post found" }));
    });
  }
);

module.exports = router;
