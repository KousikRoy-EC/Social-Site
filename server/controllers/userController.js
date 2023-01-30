import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// get a User
export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await UserModel.findById(id);

    if (user) {
      const { password, ...otherDetails } = user._doc;

      res.status(200).json(otherDetails);
    } else {
      res.status(404).json("No such user exists");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { _id, currentUserAdminStatus, password } = req.body;
  console.log(_id, id, req.body);
  if (id === _id) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }

      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "5d" }
      );
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access Denied! you can only update your own profile");
  }
};

// delete user

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;

  if (currentUserId == id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User Deleted Sucessfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cannot delete another's account");
  }
};

// follow user

export const followUser = async (req, res) => {
 
  const id = req.params.id;
  console.log(id,req.body);
  const { _id } = req.body;
  if (_id === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingsUser = await UserModel.findById(_id);
      if (!followUser.followers.includes(followingsUser)) {
        await followUser.updateOne({ $push: { followers: _id } });
        await followingsUser.updateOne({ $push: { followings: id } });
        res.status(200).json(followingsUser);
      } else {
        res.status(403).json("Already following");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

// unfollow user

export const unfollowUser = async (req, res) => {
  const id = req.params.id; //jisko follow/unfollow karna hai
  const { _id } = req.body; //apna

  if (_id === id) {
    res.status(403).json("Action Forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id); //jisko follow/unfollow karna hai
      const followingsUser = await UserModel.findById(_id); //apna
      if (followUser.followers.includes(_id)) {
        await followUser.updateOne({ $pull: { followers: _id } });
        await followingsUser.updateOne({ $pull: { followings: id } });
        res.status(200).json(followingsUser);
      } else {
        res.status(403).json("not following");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export const getAllUser = async (req, res) => {
  try {
    let user = await UserModel.find();
    user = user.map((user) => {
      const { password, ...otherDetails } = user._doc;
      return otherDetails;
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};
