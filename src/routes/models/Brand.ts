// Imports Mongoose
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

// Create Posts Schema
const brandSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        name: {
            type: String,
            default: 'ACME Company',
        },
        primary: {
            type: String,
            default: '#4ae902',
        },
        secondary: {
            type: String,
            default: '#ededed',
        },
        alternate: {
            type: String,
            default: '#232323',
        },
        logo: {
            type: String,
            default: 'www.google.com',
        },
    },
    { timestamps: true }
);

// Exports Schema For Use In Routes
const Brand = mongoose.model('Brand', brandSchema);
export default Brand;
