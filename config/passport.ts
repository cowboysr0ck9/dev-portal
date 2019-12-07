import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../src/routes/models/User';
import { PassportStatic } from 'passport';

// Exports Instance of Passport
export const PassportService = (passport: PassportStatic) => {
    passport.use(
        new Strategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: String(process.env.SECRET),
            },
            async (jwt_payload, done) => {
                try {
                    const { _id } = jwt_payload._doc;
                    const user = await User.findById(_id);
                    return user ? done(null, user) : done(null, false);
                } catch (err) {
                    console.log('Unauthorized');
                }
            }
        )
    );
};
