// Imports Mongoose
import mongoose from 'mongoose';
import { IPost } from '../../interface/post-interface';
import { Schema } from 'mongoose';
interface IPostModel extends IPost, mongoose.Document {}

// Create Posts Schema
const postSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        text: {
            type: String,
            required: true,
        },
        name: {
            type: String,
        },
        avatar: {
            type: String,
        },
        likes: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
            },
        ],
        comments: [
            {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User',
                },
                text: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                },
                avatar: {
                    type: String,
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

// Exports Schema For Use In Routes
const Post = mongoose.model<IPostModel>('Post', postSchema);
export default Post;
