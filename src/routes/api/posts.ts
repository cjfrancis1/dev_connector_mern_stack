import express from "express";
import passport from "passport";
import Post from "../../models/Post.model";
import { validatePostInput } from "../../validation/post.validation";
import IPostFields from "../../interfaces/PostFields.interface";
import Profile from "../../models/Profile.model";
import IErrors from "../../interfaces/Errors.interface";

const router = express.Router();

// @route   GET api/posts
// @desc    Get posts
// @access  private
router.get("/", (req, res) => {
  const errors: IErrors = {};
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => {
      console.error(err);
      errors.noPosts = "No posts found";
      res.status(400).json(errors);
    });
});

// @route   GET api/posts/:post_id
// @desc    Get a post by id
// @access  private
router.get("/:post_id", (req, res) => {
  const errors: IErrors = {};
  Post.findById(req.params.post_id)
    .then(post => res.json(post))
    .catch(err => {
      console.error(err);
      errors.noPost = "No post found";
      res.status(404).json(errors);
    });
});

// @route   POST api/posts
// @desc    Create post
// @access  private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    interface ICreatePostErrors extends IErrors, IPostFields {}
    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });
    const {
      errors,
      isValid
    }: { errors: ICreatePostErrors; isValid: boolean } = validatePostInput(
      req.body
    );

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    newPost
      .save()
      .then(post => res.json(post))
      .catch(err => {
        console.error(err);
        errors.badRequest = "Bad Request";
        res.status(400).json(errors);
      });

    return undefined;
  }
);

// @route   POST api/posts/like/:post_id
// @desc    like post
// @access  private
router.post(
  "/like/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors: IErrors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Confirm the logged in user has a profile
        Post.findById(req.params.post_id)
          .then(post => {
            if (!post) {
              errors.noPost = "No post found";
              return res.status(404).json(errors);
            }

            // Check is already on the post's list of likes
            if (
              post.likes.filter(post => post.user.toString() === req.user.id)
                .length > 0
            ) {
              errors.alreadyLiked = "User already liked this post";
              return res.status(400).json(errors);
            }

            // Add user id to likes array
            post.likes.unshift({ user: req.user.id });
            post
              .save()
              .then(post => res.json(post))
              .catch(err => console.error(err));
            return undefined;
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        errors.noProfile = "There is no profile for this user";
        res.status(404).json(errors);
      });
  }
);

// @route   POST api/posts/unlike/:post_id
// @desc    like post
// @access  private
router.post(
  "/unlike/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors: IErrors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Confirm the logged in user has a profile
        Post.findById(req.params.post_id)
          .then(post => {
            if (!post) {
              errors.noPost = "No post found";
              return res.status(404).json(errors);
            }

            // Check if user is on the post's list of likes
            if (
              post.likes.filter(post => post.user.toString() === req.user.id)
                .length === 0
            ) {
              errors.notLiked = "User has not yet liked this post";
              return res.status(400).json(errors);
            }

            // Remove user id from likes array
            const removeIndex = post.likes
              .map(like => like.user.toString())
              .indexOf(req.user.id);
            post.likes.splice(removeIndex, 1);
            post
              .save()
              .then(post => res.json(post))
              .catch(err => console.error(err));
            return undefined;
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        errors.noProfile = "There is no profile for this user";
        res.status(404).json(errors);
      });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    interface IAddCommentErrors extends IErrors, IPostFields {}
    const {
      errors,
      isValid
    }: { errors: IAddCommentErrors; isValid: boolean } = validatePostInput(
      req.body
    );

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        if (!post) {
          errors.noPost = "No post found";
          return res.status(404).json(errors);
        }

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post
          .save()
          .then(post => res.json(post))
          .catch(err => {
            console.error(err);
            errors.badRequest = "Bad request";
            res.status(400).json(errors);
          });
        return undefined;
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    return undefined;
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors: IErrors = {};

    Post.findById(req.params.id)
      .then(post => {
        if (!post) {
          errors.noPost = "No post found";
          return res.status(404).json(errors);
        }

        // Check to see if comment exists
        if (
          post.comments.filter(comment => comment.id! === req.params.comment_id)
            .length === 0
        ) {
          errors.commentNotExits = "Comment does not exist";
          return res.status(404).json(errors);
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item.id!)
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post
          .save()
          .then(post => res.json(post))
          .catch(err => {
            console.error(err);
            errors.badRequest = "Bad request";
            res.status(400).json(errors);
          });
        return undefined;
      })
      .catch(err => {
        errors.noProfile = "No post found";
        res.status(404).json(errors);
      });
  }
);

// @route   DELETE api/posts/:post_id
// @desc    Delete post
// @access  private
router.delete(
  "/:post_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors: IErrors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Confirm the logged in user has a profile
        Post.findById(req.params.post_id)
          .then(post => {
            if (!post) {
              errors.noPost = "No post found";
              return res.status(404).json(errors);
            }

            // Confirm the logged in user is the creater of the post
            if (post.user.toString() !== req.user.id) {
              errors.notAuthorized = "User not authorized";
              return res.status(401).json(errors);
            }

            // Delete post
            post
              .remove()
              .then(() => res.json({ success: true }))
              .catch(err => console.error(err));

            return undefined;
          })
          .catch(err => console.log(err));
      })
      .catch(err => {
        errors.noProfile = "There is no profile for this user";
        res.status(404).json(errors);
      });
  }
);

export default router;
