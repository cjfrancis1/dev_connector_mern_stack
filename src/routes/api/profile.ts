import express from "express";
import passport from "passport";
import Profile from "../../models/Profile.model";
import { IProfileFieldsFormatted } from "../../interfaces/ProfileFields.interface";
import { validateProfileInput } from "../../validation/profile.validation";
import { validateExperienceInput } from "../../validation/experience.validation";
import { validateEducationInput } from "../../validation/education.validation";
import User from "../../models/User.model";
import { IExperienceItem } from "../../interfaces/Profile.interface";
import { IEducationItem } from "../../interfaces/Profile.interface";
import IExperienceFields from "../../interfaces/ExperienceFields.interface";
import IEducationFields from "../../interfaces/EducationFields.interface";
import IErrors from "../../interfaces/Errors.interface";

const router = express.Router();

// @route   GET api/profile
// @desc    Get current user's profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors: IErrors = {};

    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"], User)
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        return res.json(profile);
      })
      .catch(err => {
        console.error(`Route /api/profile error: ${err.message}`);
        errors.notWorking = "Not working";
        res.status(400).json(errors);
      });
  }
);

// @route   GET api/profile/handle/:handle
// @desc    Get profile by handle
// @access  Public
router.get("/handle/:handle", (req, res) => {
  const errors: IErrors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"], User)
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err => {
      console.error(`Route /api/profile/handle/:handle error: ${err.message}`);
      errors.notWorking = "Not working";
      res.status(400).json(errors);
    });
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user ID
// @access  Public
router.get("/user/:user_id", (req, res) => {
  const errors: IErrors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"], User)
    .then(profile => {
      if (!profile) {
        errors.noProfile = "There is no profile for this user";
        return res.status(404).json(errors);
      }
      return res.json(profile);
    })
    .catch(err => {
      console.error(`Route api/profile/user/:user_id error: ${err.message}`);
      errors.userId = "Not working";
      res.status(400).json(errors);
    });
});

// @route   GET api/profile/all
// @desc    Get all profiles
// @access  Public
router.get("/all", (req, res) => {
  const errors: IErrors = {};

  Profile.find()
    .populate("user", ["name", "avatar"], User)
    .then(profiles => {
      if (!profiles) {
        errors.noProfiles = "There are no profiles";
        return res.status(404).json(errors);
      }
      return res.json(profiles);
    })
    .catch(err => {
      console.error(`Route api/profile/user/:user_id error: ${err.message}`);
      errors.noProfiles = "Not working";
      res.status(400).json(errors);
    });
});

// @route   POST api/profile
// @desc    Create or Edit user profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const profileFields: IProfileFieldsFormatted = {};
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // If profile input was valid
    // Get fields
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubusername)
      profileFields.githubusername = req.body.githubusername;
    // Skills - Spilt into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    // Social
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.fail })
      .then(profile => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user.id },
            { $set: profileFields },
            { new: true }
          )
            .then(profile => res.json(profile))
            .catch(err => console.error(err));
        } else {
          // Create

          // Check if handle exits
          Profile.findOne({ handle: profileFields.handle })
            .then(profile => {
              if (profile) {
                errors.handle = "That handle already exits";
                return res.status(400).json(errors);
              }
              return new Profile(profileFields)
                .save()
                .then(profile => res.json(profile))
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        }
      })
      .catch(err => console.error(err));
    return undefined;
  }
);

// @route   POST api/profile/experience
// @desc    Add or Edit user experience
// @access  Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    interface IErrors extends IExperienceFields {
      noProfile?: string;
      notWorking?: string;
    }
    const {
      errors,
      isValid
    }: { errors: IErrors; isValid: boolean } = validateExperienceInput(
      req.body
    );

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // If Experience input was valid
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user.";
          return res.status(404).json(errors);
        }
        const newExp: IExperienceItem = {
          title: req.body.title,
          company: req.body.company,
          location: req.body.location,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        // Add to exp array
        profile.experience.unshift(newExp);

        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            console.error(err);
          });
        return undefined;
      })
      .catch(err => {
        console.error(`Route /api/profile/experience error: ${err.message}`);
        errors.notWorking = "Not working";
        res.status(400).json(errors);
      });
    return undefined;
  }
);

// @route   POST api/profile/education
// @desc    Add or Edit user education
// @access  Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    interface IErrors extends IEducationFields {
      noProfile?: string;
      notWorking?: string;
    }
    const {
      errors,
      isValid
    }: { errors: IErrors; isValid: boolean } = validateEducationInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // If Education input was valid
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user.";
          return res.status(404).json(errors);
        }
        const newEdu: IEducationItem = {
          school: req.body.school,
          degree: req.body.degree,
          fieldofstudy: req.body.fieldofstudy,
          from: req.body.from,
          to: req.body.to,
          current: req.body.current,
          description: req.body.description
        };

        // Add to exp array
        profile.education.unshift(newEdu);

        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            console.error(err);
          });
        return undefined;
      })
      .catch(err => {
        console.error(`Route /api/profile/education error: ${err.message}`);
        errors.notWorking = "Not working";
        res.status(400).json(errors);
      });
    return undefined;
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors: IErrors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user.";
          return res.status(404).json(errors);
        }

        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        if (removeIndex !== -1) {
          profile.experience.splice(removeIndex, 1);
        }

        // Save
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            console.error(err);
          });
        return undefined;
      })
      .catch(err => {
        console.error(
          `Route DELETE /api/profile/experience error: ${err.message}`
        );
        errors.notWorking = "Not working";
        res.status(400).json(errors);
      });
    return undefined;
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors: IErrors = {};

    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user.";
          return res.status(404).json(errors);
        }

        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        if (removeIndex !== -1) {
          profile.education.splice(removeIndex, 1);
        }

        // Save
        profile
          .save()
          .then(profile => res.json(profile))
          .catch(err => {
            console.error(err);
          });
        return undefined;
      })
      .catch(err => {
        console.error(
          `Route DELETE /api/profile/education error: ${err.message}`
        );
        errors.notWorking = "Not working";
        res.status(400).json(errors);
      });
    return undefined;
  }
);

// @route   DELETE api/profile/
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors: IErrors = {};

    // Delete profile
    Profile.findOneAndRemove({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noProfile = "There is no profile for this user";
          return res.status(404).json(errors);
        }

        // Delete user
        User.findByIdAndRemove({ _id: req.user.id })
          .then(user => {
            if (!user) {
              errors.noUser = "There is no user matching this user id";
              return res.status(404).json(errors);
            }

            return res.json({ success: true });
          })
          .catch(err => {
            console.error(err);
            return res.json({ success: false });
          });
        return undefined;
      })
      .catch(err => {
        console.error(err);
        return res.json({ success: false });
      });
    return undefined;
  }
);

export default router;
