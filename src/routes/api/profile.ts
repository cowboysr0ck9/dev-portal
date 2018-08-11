import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import passport from 'passport';
// import DEV_ENV from '../../../config/config';

// Imports Profile & User Data Models
import Profile from '../models/Profile';
import User from '../models/User';

// Implements Custom Server Side Validation
import validateProfileInput from '../../validation/profile';
import validateExperienceInput from '../../validation/experience';
import validateEducationInput from '../../validation/education';
import { IProfile } from '../../interface/profile-interface';

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
            .populate('user', ['name', 'avatar'])
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

// @Route GET api/profile/handle/:handle
// @Desc Gets profile by handle
// @Access Public Route

router.get('/handle/:handle', (req: Request, res: Response) => {
    const errors = {
        noProfile: '',
    };
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatra'])
        .then((profile) => {
            if (!profile) {
                errors.noProfile = 'No profile has been found for this user.';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch((err) =>
            res
                .status(404)
                .json({ profile: 'No profile has been found for this user.' })
        );
});

// @Route GET api/profile/user/:user_id
// @Desc Finds profile by 'user_id'
// @Access Public Route

router.get('/user/:user_id', (req: Request, res: Response) => {
    const errors = {
        noProfile: '',
    };
    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatra'])
        .then((profile) => {
            if (!profile) {
                errors.noProfile = 'No profile has been found for this user.';
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch((err) =>
            res
                .status(404)
                .json({ profile: 'No profile has been found for this user.' })
        );
});

// @Route GET api/profile/all
// @Desc Returns all profiles
// @Access Public Route

router.get('/all', (req: Request, res: Response) => {
    const errors = {
        noProfiles: '',
    };

    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then((profiles) => {
            if (!profiles) {
                errors.noProfiles = 'No profiles have been found.';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch((err) =>
            res.status(404).json({ profile: 'No profiles have been found.' })
        );
});

// @Route POST api/profile
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

// @Route POST api/profile/experience
// @Desc Create or Edit Experience
// @Access Private Route

router.post(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateExperienceInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar'])
            .then((profile) => {
                if (!profile) {
                    errors.noprofiles = 'Profile not found on the server';
                    // erro 404 not found
                    return res.status(404).json(errors);
                }
                const newExperience = {
                    id: '',
                    title: req.body.title,
                    company: req.body.company,
                    location: req.body.location,
                    from: req.body.from,
                    current: req.body.current,
                    to: req.body.to,
                    description: req.body.description,
                };
                // Add experience
                profile.experience.unshift(newExperience);
                profile
                    .save()
                    .then((profile) => res.json(profile))
                    .catch((err) => {
                        res.status(404).json({
                            experience:
                                'Sorry your experience encountered an error.',
                        });
                    });
            });
    }
);

// @Route POST api/profile/education
// @Desc Create or Edit Education
// @Access Private Route

router.post(
    '/education',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateEducationInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar'])
            .then((profile) => {
                if (!profile) {
                    errors.error = 'Profile not found on the server';
                    return res.status(404).json(errors);
                }
                const newEducation = {
                    id: '',
                    school: req.body.school,
                    degree: req.body.degree,
                    studied: req.body.studied,
                    from: req.body.from,
                    to: req.body.to,
                    current: req.body.current,
                    description: req.body.description,
                };

                // Add education
                profile.education.unshift(newEducation);
                profile
                    .save()
                    .then((profile) => res.json(profile))
                    .catch((err) => {
                        res.status(404).json({
                            education:
                                'Sorry there was an error with your education.',
                        });
                    });
            });
    }
);

// @Route DELETE api/profile/experience/:exp_id
// @Desc Delete Experience from profile
// @Access Private Route

router.delete(
    '/experience/:exp_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then((profile) => {
                // Get remove index
                const removeIndex = profile.experience
                    .map((item) => item.id)
                    .indexOf(req.params.exp_id);

                // Splice out of array
                profile.experience.splice(removeIndex, 1);

                // Save
                profile.save().then((profile) => res.json(profile));
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    }
);

// @Route DELETE api/profile/education/:edu_id
// @Desc Delete Education from profile
// @Access Private Route

router.delete(
    '/education/:edu_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then((profile) => {
                // Get remove index
                const removeIndex = profile.education
                    .map((item) => item.id)
                    .indexOf(req.params.edu_id);

                // Splice out of array
                profile.education.splice(removeIndex, 1);

                // Save
                profile.save().then((profile) => res.json(profile));
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    }
);

// @Route DELETE api/profile
// @Desc Delete User and Profile
// @Access Private Route

router.delete(
    '/profile',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({
            user: req.user.id,
        })
            .then(() => {
                User.findOneAndRemove({ _id: req.user.is }).then(() => {
                    res.json({ msg: 'Your profile was sucessfully deleted.' });
                });
            })
            .catch((err) => {
                res.status(404).json(err);
            });
    }
);

export default router;
