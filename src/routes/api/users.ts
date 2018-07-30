import express from "express";
import { Request, Response } from "express";
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';

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

             let t = newUser.password;
           bcrypt.genSalt(10, (err: Error, salt: string) => {

           })
          }
  })
});

export default router;
