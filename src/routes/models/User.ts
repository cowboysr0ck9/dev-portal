// Imports Mongoose
import mongoose from 'mongoose';
import uniqueValidator from "mongoose-unique-validator";

// Initializes a Schema Variable
const Schema = mongoose.Schema;

// Creates User Data Model
const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, "Users must define a username"],
    match: [/^[a-zA-Z0-9]+$/, 'is an invalid username'],
    lowercase: true,
    unique: true
  },
  email: {
    type: String,
    required: [true, "Users must provide a valid email address"],
    match: [/\S+@\S+\.\S+/, 'is an invalid email address'],
    index: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now()
  }
}, { timestamps: true });

// Applies Custom Unique Validator to Users
UserSchema.plugin(uniqueValidator, { message: 'is already taken.' });

export default mongoose.model('User', UserSchema);
