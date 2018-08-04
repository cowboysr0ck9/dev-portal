import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import passport from 'passport';
// import DEV_ENV from '../../../config/config';

// Imports Profile & User Data Models
import Profile from '../models/Profile';
import User from '../models/User';

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

export default router;
