import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unfollowUser } from "../../redux/action/user";

const UserProfile = ({follower}) => {
  const {user} = useSelector((state) => state.auth.userData);

const dispatch = useDispatch(); 
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [following, setFollowing] = useState(
    follower.followers.includes(user._id)
  );


  // const handleFollow = (e) => {
  //   e.preventDefault();
  //   following
  //     ? dispatch(unfollowUser({id:follower._id, user:user}))
  //     : dispatch(followUser({id:follower._id, user:user}));
  //   setFollowing((prev) => !prev);
  // };


  return (
    <div className="follower">
      <div>
        <img src={
            publicFolder + follower.profilePicture
              ? publicFolder + follower.profilePicture
              : publicFolder + "defaultProfile.png"
          } alt={follower.name} className="followerImg" />
        <div className="follower-info">
          <span>{follower.firstname}</span>
          <span>@{follower.username}</span>
        </div>
      </div>

      <button  className="button foll-btn"> {following ? "Unfollow" : "Follow"}</button>
    </div>
  );
};

export default UserProfile;
