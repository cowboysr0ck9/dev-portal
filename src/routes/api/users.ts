import express from "express";
import { Request, Response } from "express";
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Development Keys
import DEV_ENV from "../../../config/config";

// Load User Mongoose Data Model
import { User } from '../models/User';


const router = express.Router();

// @Route GET api/users/test
// @Desc Test users route
// @Access Public
router.get('/test', (req: Request, res: Response) => res.json({msg: 'User works'}));


// @Route POST api/users/register
// @Desc Register user
// @Access Public
router.post('/register', (req: Request, res: Response) => {
User.findOne({email: req.body.email})
  .then((user: any )=> {
    if (user) {
      return res.status(400).json({email: 'Email already exists'})
    } else {
             // Gravatar https://github.com/emerleite/node-gravatar
             const avatar = gravatar.url(req.body.email, {
               s: "200",
               r: "pg",
               d: "mm"
             });

             const newUser = new User({
               name: req.body.name,
               username: req.body.username,
               email: req.body.email,
               password: req.body.password,
               avatar
             });

           bcrypt.genSalt(12, (err: Error, salt: string) => {
              bcrypt.hash(newUser.password, salt, (err: Error, hash: string) =>{
              if(err) throw err;
              newUser.password = hash;
              newUser.save()
                .then(user => {
                  res.json(user)
                })
                .catch(err => {
                  console.log(err)
                })
              })
           })
          }
  })
});

// @Route GET api/users/login
// @Desc Login User & Return JWT
// @Access Public
router.post('/login', (req: Request, res: Response)=>{
  const email = req.body.email;
  const password = req.body.password;

  // Find User by Email
  User.findOne({email})
    .then(user => {
            // Check For User
            if (!user) {
              res.status(404).json({ email: "User not found" });
            }

            // Check Password
            // In Future turn on strictNullCheck and see why typescript calls user.password null
            bcrypt.compare(password, user.password).then(isMatch => {
              if (isMatch) {
                // User Matched
                // Creates JWT Payload
                const payload = {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  username: user.username,
                  avatar: user.avatar
                }

                // Sign Token
                jwt.sign(payload, DEV_ENV.SECRET, {
                  expiresIn: 86400, //Only Valid for 24 Hours
                },
                (err: Error, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                });

              } else {
                return res.status(400).json({ password: "Password Incorrect" });
              }
            });
          })
})

export default router;
