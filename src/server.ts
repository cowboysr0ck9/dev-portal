// Import Core Server Libraries
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';

// Import Global Config Settings
import DEV_ENV from '../config/config';

// Router Links
import users from './routes/api/users';
import profile from './routes/api/profile';
import posts from './routes/api/posts';

// Create Express.JS Instance
const app: express.Application = express();

// bodyParser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MLab Development URI with Username & Password Credentials
const db = DEV_ENV.MONGO_URI;

// Mongoose ODM Library
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch((err: string) => console.log(err));

// Passport
app.use(passport.initialize());

// Attach Local Instance of Passport Strategy to type "passport"
import MyPassportService from '../config/passport';
MyPassportService(passport);

// Force Router To Use These Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Serve the application at the given port
// The port the express app will listen on
const port: any = process.env.PORT || 3000;

app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
