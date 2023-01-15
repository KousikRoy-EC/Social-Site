import React from "react";
import { useState } from "react";
import { UilPen } from "@iconscout/react-unicons";
import "./ProfileInfoCard.css";
import ProfileEditModal from "../ProfileEditModal/ProfileEditModal";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserApi } from "../../api/userApi";
import { useEffect } from "react";
import { logoutThunk } from "../../redux/action/auth";

const ProfileInfoCard = () => {
  const [modalOpen, setmodalOpen] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const profileId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.auth.userData);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logoutThunk());
  };

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileId === user._id) {
        setProfileUser(user);
      } else {
        const res = await getUserApi(profileId);
        setProfileUser(res.data);
      }
    };

    fetchProfileUser();
  }, [user]);

  return (
    <div className="ProfileInfoCard">
      <div className="profileInfoHeader">
        <h4>Profile Info</h4>
        <div
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          className="edit-btn "
        >
          {user._id === profileId && (
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setmodalOpen(true)}
            />
          )}
          <ProfileEditModal
            open={modalOpen}
            onClose={setmodalOpen}
            data={user}
          />
        </div>
      </div>
      
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span style={{fontSize:"14px"}}>{profileUser.relationship}</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span style={{fontSize:"14px"}}>{profileUser.from}</span>
      </div>

      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span style={{fontSize:"14px"}}>{profileUser.worksAt}</span>
      </div>

      <button onClick={handleLogout} className="button logout-btn">
        Log out
      </button>
    </div>
  );
};

export default ProfileInfoCard;
