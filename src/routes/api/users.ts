import express, { Request, Response } from 'express';
const router = express.Router();
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import passport from 'passport';

// Load User Mongoose Data Model
import User from '../models/User';

// Load Input Validation
import validateRegisterInput from '../../validation/register';
import validateLoginInput from '../../validation/login';

// @Route POST api/users/register
// @Desc Register user
// @Access Public
router.post('/register', async (req: Request, res: Response) => {
    const { email } = req.body;
    const { errors, isValid } = validateRegisterInput(req.body);

    isValid ? null : () => res.status(400).json(errors);

    User.findOne({ email }).then((user: any) => {
        if (user) {
            errors.email = 'Sorry, That emaill address is taken.';
            return res.status(400).json({ errors });
        } else {
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm',
            });

            const newUser = new User({
                ...req.body,
                avatar,
            });

            // Change Number of Rouds Based on Modern Best Practices
            bcrypt.genSalt(16, (err: Error, salt: string) => {
                bcrypt.hash(newUser.password, salt, (err: Error, hash: string) => {
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
                });
            });
        }
    });
});

// @Route GET api/users/login
// @Desc Login User & Return JWT
// @Access Public
router.post('/login', async (req: Request, res: Response) => {
    const { errors, isValid } = validateLoginInput(req.body);

    !isValid ? () => res.status(404).json(errors) : null;

    const { email, password } = req.body;

    // Find User by Email
    User.findOne({ email }).then((user) => {
        // Check For User
        if (!user) {
            errors.email = 'User not found';
            res.status(404).json({ errors });
        }
        req.user = { ...user };
        // Check Password
        // In Future turn on strictNullCheck and see why typescript calls user.password null
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                jwt.sign(
                    { ...user },
                    process.env.SECRET,
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
router.get('/current', passport.authenticate('jwt', { session: false }), (req: Request, res: Response) => {
    res.json({
        ...req.user,
    });
});

export default router;
