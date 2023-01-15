import React, { useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Heart from "../../img/like.png";
import share from "../../img/share.png";
import NotLike from "../../img/notlike.png";
import { useDispatch, useSelector  } from "react-redux";
import { useEffect } from "react";
import {likePostApi} from "../../api/postApi";
const Post = ({ data }) => {
const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth.userData);
  const [Liked,setLiked]=useState(data.likes.includes(user._id));
  const [Likes,setLikes]=useState(data.likes.length);

const handleLikes = async() =>{
  setLiked(!Liked);
  try {
    const response = await likePostApi(user._id,{postId:data._id});
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
  setLikes(Liked ? Likes-1 : Likes+1);
}


  return (
    <div className="Post">
      <img
        src={data.img ? process.env.REACT_APP_PUBLIC_FOLDER + data.img : ""}
        alt=""
      />
      <div className="post-reaction">
        <img src={Liked ? Heart : NotLike} alt="" style={{cursor:"pointer"}} onClick={handleLikes} />
        <img src={Comment} alt="" />
        <img src={share} alt="" />
      </div>

      <span>{Likes} likes</span>

      <div className="details">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
};

export default Post;