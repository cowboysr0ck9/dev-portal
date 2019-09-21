// Import Core Server Libraries
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';

import path from 'path';
// Import Global Config Settings
import DEV_ENV from '../config/config';

// Router Links
import users from './routes/api/users';
import profile from './routes/api/profile';
import posts from './routes/api/posts';

// Create Express.JS Instance
const app: express.Application = express();

// Uses Helmet.js to set HTTP Headers
// Adds extra layer of security to API
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
        },
    })
);
app.use(helmet.noCache());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

// Enables gZip Compression on all routes
app.use(compression());

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

if (process.env.NODE_ENV === 'production') {
    // Set The Static Folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Serve the application at the given port
// The port the express app will listen on
const port: any = process.env.PORT || 5000;

app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
