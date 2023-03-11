import React from "react";
import "./ProfileCard.css";
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'

const ProfileCard = ({render}) => {
const serverImg = process.env.REACT_APP_PUBLIC_FOLDER;
const {user}=useSelector(state=>state.auth.userData)
const posts=useSelector(state=>state.post.postData)


  return (
    <div className="ProfileCard">
      <div className="profileImg">
      <img src={
            user.coverPicture
              ? serverImg + user.coverPicture
              : serverImg + "defaultCoverImg.jpg"
          } alt="CoverImage" />
        <img
          src={
            user.profilePicture
              ? serverImg + user.profilePicture
              : serverImg + "defaultProfileImg.png"
          }
          alt="ProfileImage"
        />

      </div>

      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt}</span>
      </div>

      <div className="folowingStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.following? user.following.length : 0}</span>
            <span>followings</span>
          </div>
          <div className="verticalLine"></div>
          <div className="follow">
            <span>{user.followers? user.followers.length : 0}</span>
            <span>followers</span>
          </div>

          {render==="profilePage" && (
            <>
              <div className="verticalLine"></div>
              <div className="follow">
                <span>{posts.filter((post)=> post.userId===user._id).length}</span>
                <span>Posts</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>
      {render==="profilePage" ? (
        <></>
      ) : (
        <div className="linktoProfile">
          <span>
          <Link style={{textDecoration:"none",color:"inherit"}} to={`/profile/${user._id}`}  >My Profile </Link></span>
        </div>
      )}
    </div>
  ); 
};

export default ProfileCard;
