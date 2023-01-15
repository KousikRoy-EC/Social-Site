import React from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
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
        <img src={user.coverPicture ?serverImg+user.coverPicture:serverImg+"defaultCoverImg.jpg" } alt="profile" />
        <img src={user.profilePicture ?serverImg+user.profilePicture:serverImg+"defaultProfileImg.png" }  alt="profile" />
      </div>

      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt}</span>
      </div>

      <div className="folowingStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followings.length}</span>
            <span>followings</span>
          </div>
          <div className="verticalLine"></div>
          <div className="follow">
            <span>{user.followers.length}</span>
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
