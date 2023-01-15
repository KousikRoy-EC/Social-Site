import React from "react";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import PostPart from "../../components/PostPart/PostPart";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import NotificationPart from "../../components/NotificationPart/NotificationPart";
import "./profile.css";
const Profile = () => {
  return (
    <div className="Profile">
      <ProfileLeft />
      <div className="profilePage">
        <ProfileCard render="profilePage"/>
        <PostPart />
      </div>

      <NotificationPart />
    </div>
  );
};

export default Profile;
