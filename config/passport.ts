import { Strategy, ExtractJwt } from 'passport-jwt';
import mongoose from 'mongoose';
// Import User Model from Mongooser
import User from '../src/routes/models/User';
import DEV_ENV from './config';

// Defines Passport JWT Strategy
const jwtStrategy = Strategy;
const extractJwt = ExtractJwt;

// Passport Options
const opts = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: DEV_ENV.SECRET,
};

// Exports Instance of Passport
export default (passport: any) => {
    passport.use(
        new jwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
    );
};
