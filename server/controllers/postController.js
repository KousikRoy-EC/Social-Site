import postModel from "../models/postModel.js";
import userModel from "../models/userModel.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
  const newPost = new postModel(req.body);

  try {
    const postData =await newPost.save();
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await postModel.findById(id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await postModel.findById(id);
    if (post.userId === userId) {
      await postModel.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).json("Post Updated Sucessfull");
    } else {
      res.status(403).json("cannot update post");
    }
  } catch (err) {
    res.status(404).json(err);
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;

  try {
    const post = await postModel.findById(id);
    if (post.userId === userId) {
      await postModel.findByIdAndDelete(id);
      res.status(200).json("Post Deleted Sucessfully");
    } else {
      res.status(403).json("cannot delete post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// timeline/feed post

export const timelinePost = async (req, res) => {
  const userId = req.params.id;
console.log(userId);
  try {
    const currentUserPosts = await postModel.find({ userId: userId });
    const followingPosts = await userModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "followings",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((post1, post2) => {
          return post2.createdAt - post1.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};


// like/dislike a post

export const likePost = async (req, res) => {
  const userId = req.params.id;
  const { postId } = req.body;
  try {
    const post = await postModel.findById(postId);
    if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    } else {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};