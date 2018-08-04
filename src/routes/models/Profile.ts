// Imports Mongoose
import mongoose from 'mongoose';
import { IProfile } from '../../interface/profile-interface';
import { Schema } from 'mongoose';
interface IProfileModel extends IProfile, mongoose.Document {}

// Creates Profile Data Model Schema
const profileSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    handle: {
        type: String,
        required: true,
        max: 40,
    },
    company: {
        type: String,
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    status: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        required: true,
    },
    bio: {
        type: String,
    },
    github: {
        type: String,
    },
    experience: [
        {
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            location: {
                type: String,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
            },
        },
    ],
    education: [
        {
            school: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            studied: {
                type: String,
            },
            from: {
                type: Date,
                required: true,
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false,
            },
            description: {
                type: String,
            },
        },
    ],
    social: {
        youtube: {
            type: String,
        },
        twitter: {
            type: String,
        },
        facebook: {
            type: String,
        },
        instagram: {
            type: String,
        },
        linkedin: {
            type: String,
        },
        dribbble: {
            type: String,
        },
        behance: {
            type: String,
        },
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});

const Profile = mongoose.model<IProfileModel>('Profile', profileSchema);
export default Profile;
