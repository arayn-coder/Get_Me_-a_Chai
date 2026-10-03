import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: String,
    username: {
      type: String,
      required: true,
    },
    password: String,
    profilepic: String,
    coverpic: String,
    razorpayid: String,
    razorpaysecret: String,
    isCreator: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const User =
  mongoose.models.GetMeChaiUser ||
  mongoose.model("GetMeChaiUser", UserSchema, "getmechai_users");

export default User;