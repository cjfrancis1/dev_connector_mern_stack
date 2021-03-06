import mongoose from "mongoose";
import IUser from "../interfaces/User.interface";

const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
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
    default: Date.now
  }
});

const User: mongoose.Model<IUser> = mongoose.model("User", UserSchema);

export default User;
