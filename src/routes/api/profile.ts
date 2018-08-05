import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import passport from 'passport';
// import DEV_ENV from '../../../config/config';

// Imports Profile & User Data Models
import Profile from '../models/Profile';
import User from '../models/User';
import validateProfileInput from '../../validation/profile';

// @Route GET api/profile
// @Desc Gets user's profile
// @Access Private route
router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response) => {
        // Initializes Errors Response Object
        let errors = {
            noProfile: '',
        };

        Profile.findOne({ user: req.user.id })
            .then((profile) => {
                if (!profile) {
                    errors.noProfile =
                        'No profile has been found for this user.';
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    }
);

// @Route GET api/profile
// @Desc Create or Edit User Profile
// @Access Private Route
router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response) => {
        // Initializes Errors Response Object
        let { errors, isValid } = validateProfileInput(req.body);
        // Checks Validation
        if (!isValid) {
            // Return Errors
            return res.status(400).json(errors);
        }
        errors = {};

        // Capture All Incoming Profile Data
        const profileFields = {
            user: '',
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: [''],
            social: {
                youtube: '',
                twitter: '',
                facebook: '',
                instagram: '',
                linkedin: '',
                dribbble: '',
                behance: '',
            },
        };
        profileFields.user = req.user.id;

        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.status) profileFields.status = req.body.status;

        // Captures Skills In An Array Format
        if (typeof req.body.skills !== 'undefined') {
            // Splits Values At the ','
            profileFields.skills = req.body.skills.split(',');
        }

        // Social Profiles Object
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook)
            profileFields.social.facebook = req.body.facebook;
        if (req.body.instagram)
            profileFields.social.instagram = req.body.instagram;
        if (req.body.linkedin)
            profileFields.social.linkedin = req.body.linkedin;
        if (req.body.dribbble)
            profileFields.social.dribbble = req.body.dribbble;
        if (req.body.behance) profileFields.social.behance = req.body.behance;

        if (req.body.github) profileFields.handle = req.body.handle;

        // find user profile
        Profile.findOne({ user: req.user.id })
            .then((profile) => {
                if (profile) {
                    // Update
                    console.log(profileFields);
                    Profile.findOneAndUpdate(
                        { user: req.user.id },
                        { $set: profileFields },
                        { new: true }
                    )
                        .then((profile) => res.json(profile))
                        .catch((error) =>
                            res.status(400).json({
                                msg: 'Profile error occured, please try again.',
                            })
                        );
                } else {
                    // Creates Profile
                    // First checks to see if profile exists
                    Profile.findOne({ handle: profileFields.handle }).then(
                        (profile) => {
                            if (profile) {
                                res.status(400).json({
                                    msg:
                                        'Sorry, this profile handles already exists.',
                                });
                            }
                        }
                    );
                    // Saves New User Profile
                    new Profile(profileFields)
                        .save()
                        .then((profile) => {
                            res.json(profile);
                        })
                        .catch((error) =>
                            res.status(400).json({
                                msg:
                                    'An error occured while saving the profile.',
                            })
                        );
                }
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    }
);

export default router;
