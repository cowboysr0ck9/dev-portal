// Imports Mongoose
import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IUser } from "../../interface/user.interface";
interface IUserModel extends IUser, mongoose.Document { };


// Creates User Data Model Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Users must provide a name"],
      lowercase: true,
    },
    username: {
      type: String,
      required: [true, "Users must define a username"],
      match: [/^[a-zA-Z0-9]+$/, "is an invalid username"],
      lowercase: true,
      unique: true
    },
    email: {
      type: String,
      required: [true, "Users must provide a valid email address"],
      match: [/\S+@\S+\.\S+/, "is an invalid email address"],
      index: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

// Applies Custom Unique Validator to Users
userSchema.plugin(uniqueValidator, { message: 'is already taken.' });


export const User = mongoose.model<IUserModel>("User", userSchema);
