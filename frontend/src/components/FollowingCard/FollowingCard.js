import React from "react";
import "./FollowingCard.css";
import UserProfile from "../User/userProfile";
import { FollowerData } from "../../Data/FollowerData";
import { useEffect } from "react";
import {getAllUserApi} from '../../api/userApi'
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const FollowingCard = () => {
  const dispatch=useDispatch();
  const {user} = useSelector((state) => state.auth.userData);
  const [Person,setPerson] = useState([]);
  const {allUser} = useSelector((state) => state.user.allUser);


  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUserApi();
      setPerson(data);
    };
    fetchPersons();
  }, []);


  return (
    <div className="FollowingCard">
      <h3>People you may know</h3>

      {Person.map((follower, id) => {
        return (
         <UserProfile follower={follower} id={id}/>
        );
      })}
    </div>
  );
};

export default FollowingCard;
