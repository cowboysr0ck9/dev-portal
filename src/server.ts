// Import Core Server Libraries
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import dotenv from 'dotenv';
import path from 'path';

import { PassportService } from '../config/passport';

// Router Links
import users from './routes/api/users';
import profile from './routes/api/profile';
import posts from './routes/api/posts';
import brands from './routes/api/brand';

dotenv.config();

// Create Express.JS Instance
const app: express.Application = express();

app.use(helmet());
app.use(helmet.noCache());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

mongoose
    .connect(
        String(process.env.MONGO_URI),
        { useNewUrlParser: true }
    )
    .then(() => console.log(`MongoDB Connected`))
    .catch((err: string) => console.log(err));

PassportService(passport);

// Force Router To Use These Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/brands', brands);

if (process.env.NODE_ENV === 'production') {
    // Set The Static Folder
    app.use(express.static(path.join(__dirname, '../../client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../../client/build/index.html'));
    });
}

app.listen(process.env.PORT, () => {
    console.log(`Server Started: http://localhost:${process.env.PORT}/`);
});
