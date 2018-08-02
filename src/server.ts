// Import Core Server Libraries
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

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

// 1st API Route
app.get('/', (req, res) => {
    res.send('Hello Developer, Tyler');
});

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
