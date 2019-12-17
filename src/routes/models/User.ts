// Imports Mongoose
import mongoose from 'mongoose';

export interface IUserModel extends mongoose.Document {
    name: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
}

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Users must provide a name'],
            lowercase: true,
        },
        username: {
            type: String,
            required: [true, 'Users must define a username'],
            match: [/^[a-zA-Z0-9]+$/, 'is an invalid username'],
            lowercase: true,
            unique: true,
        },
        email: {
            type: String,
            required: [true, 'Users must provide a valid email address'],
            match: [/\S+@\S+\.\S+/, 'is an invalid email address'],
            index: true,
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
    },
    { timestamps: true }
);

const User = mongoose.model<IUserModel>('User', userSchema);
export default User;
