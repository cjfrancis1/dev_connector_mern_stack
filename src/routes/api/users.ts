import express from "express";
import User from "../../models/User.model";
import IUser from "../../interfaces/User.interface";
import gravatar from "gravatar";
import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import passport from "passport";
import { validateRegisterInput } from "../../validation/register.validation";
import { validateLoginInput } from "../../validation/login.validation";
import { ILoginFields } from "../../interfaces/LoginFields.interface";
const secretOrKey = require("../../config/keys").secretOrKey;

const router = express.Router();

// @route   GET api/users/register
// @desc    Register user
// @access  Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // If register input was valid
  const {
    name,
    email,
    password
  }: {
    name: string;
    email: string;
    password: string;
  } = req.body;

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.email = "Email already exists";
        res.status(400).json(errors);
      } else {
        const avatar: string = gravatar.url(email, {
          s: "200", // Size
          r: "pg", // Rating
          d: "mm" // Default
        });
        const newUser: IUser = new User({
          name: name,
          email: email,
          avatar,
          password: password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(
            newUser.password,
            salt,
            () => undefined,
            (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => res.json(user))
                .catch(err => console.error(err));
            }
          );
        });
      }
    })
    .catch(err => console.error(err));
  return undefined;
});

// @route   GET api/users/login
// @desc    Log a user in
// @access  Public
router.post("/login", (req, res) => {
  interface IErrors extends ILoginFields {
    badRequest?: string;
  }

  const {
    errors,
    isValid
  }: { errors: IErrors; isValid: boolean } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // If login input was valid
  const {
    email,
    password
  }: {
    email: string;
    password: string;
  } = req.body;

  // Find user by email
  User.findOne({ email })
    .then(user => {
      if (!user) {
        errors.email = "User not found";
        res.status(404).json(errors);
      } else {
        // Check password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (isMatch) {
            // User matched
            const payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            };

            // Sign token
            jwt.sign(
              payload,
              secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: `Bearer ${token}`
                });
              }
            );
          } else {
            errors.password = "Password is incorrect";
            res.status(400).json(errors);
          }
        });
      }
    })
    .catch(err => {
      errors.badRequest = "Bad Request";
      res.status(500).json(errors);
      console.error(err);
    });
  return undefined;
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
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

export default router;
