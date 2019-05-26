const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')
//Post Model
const Post = require('../../models/Post')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
//Validation
const validatePostInput = require('../../validation/post')

//@route Post api/Posts
// @desc Create Post
// @access Private
router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(post => {
      res.json(post)
    })
})
// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    )
})
//@route Post api/Posts
// @desc Create Post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    })
    newPost.save().then(post => res.json(post))
  }
)
//@route Delete api/Posts
// @desc Delete Post
// @access Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'user Not authorized' })
          }
          post.remove().then(() => res.json({ success: true }))
        })
        .catch(err => res.status(404).json(err))
    })
  }
)
//@route POST api/Posts/like/:id
// @desc Create Likes
// @access Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'You have already liked' })
          }
          //Add user id to likes array
          post.likes.unshift({ user: req.user.id })
          post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json(err))
    })
  }
)
//@route POST api/Posts/unlike/:id
// @desc Unlike Likes
// @access Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            (post.likes.filter(
              like => like.user.toString() === req.user.id
            ).length = 0)
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'You have not yet liked boss' })
          }
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id)
          post.likes.splice(removeIndex, 1)
          post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json(err))
    })
  }
)
//@route POST api/Posts/comment/:id
// @desc Add Comment to post
// @access Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body)
    if (!isValid) {
      return res.status(400).json(errors)
    }
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          const newCommment = {
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id
          }
          //Add user id to comments array
          post.comments.unshift(newCommment)
          post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json(err))
    })
  }
)
//@route DELETE api/Posts/comment/:id/:comment_id
// @desc Remove Comment to post
// @access Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.comments.filter(
              comment => comment._id.toString() === req.params.comment_id
            ).length === 0
          ) {
            return res
              .status(404)
              .json({ commentnotExist: 'Comment Does Not exist' })
          }
          const removeIndex = post.comments
            .map(item => item.user.toString())
            .indexOf(req.user.id)
          post.comments.splice(removeIndex, 1)

          post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json(err))
    })
  }
)
module.exports = router
