import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true },

    password: { type: String, required: true },

    firstname: { type: String, required: true },

    lastname: { type: String, required: true },

    isAdmin: { type: Boolean, default: false },

    profilePicture: { type: String, default: "" },

    followers: { type: Array, default: [] },

    followings: { type: Array, default: [] },

    coverPicture: { type: String, default: "" },

    about: { type: String, default: "" },

    from: { type: String, default: "" },

    relationship: { type: String, default: "" },

    worksAt: { type: String, default: "" },

    country: { type: String, default: "" },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
export default userModel;
