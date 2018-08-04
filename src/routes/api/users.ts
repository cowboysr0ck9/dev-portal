import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import DEV_ENV from '../../../config/config';
import passport from 'passport';

// Load User Mongoose Data Model
import User from '../models/User';

// Load Input Validation
import validateRegisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';

// @Route POST api/users/register
// @Desc Register user
// @Access Public
router.post('/register', (req: Request, res: Response) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email }).then((user: any) => {
        if (user) {
            errors.email = 'Email address already exists.';
            return res.status(400).json({ errors });
        } else {
            // Gravatar https://github.com/emerleite/node-gravatar
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm',
            });

            const newUser = new User({
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar,
            });

            // Change Number of Rouds Based on Modern Best Practices
            bcrypt.genSalt(16, (err: Error, salt: string) => {
                bcrypt.hash(
                    newUser.password,
                    salt,
                    (err: Error, hash: string) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then((user) => {
                                res.json(user);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                );
            });
        }
    });
});

// @Route GET api/users/login
// @Desc Login User & Return JWT
// @Access Public
router.post('/login', (req: Request, res: Response) => {
    // Runs Validation Prior To Hitting the Route
    const { errors, isValid } = validateLoginInput(req.body);

    // Checks Validation
    if (!isValid) {
        return res.status(404).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find User by Email
    User.findOne({ email }).then((user) => {
        // Check For User
        if (!user) {
            errors.email = 'User not found';
            res.status(404).json({ errors });
        }

        // Check Password
        // In Future turn on strictNullCheck and see why typescript calls user.password null
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // User Matched
                // Creates JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    avatar: user.avatar,
                };

                // Sign Token
                jwt.sign(
                    payload,
                    DEV_ENV.SECRET,
                    {
                        expiresIn: 86400, //Only Valid for 24 Hours
                    },
                    (err: Error, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token,
                        });
                    }
                );
            } else {
                errors.password = 'Password is incorrect';
                return res.status(400).json({ errors });
            }
        });
    });
});

// @Route GET api/users/current
// @Desc Return Current User
// @Access Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req: Request, res: Response) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            username: req.user.username,
            email: req.user.email,
        });
    }
);

export default router;
