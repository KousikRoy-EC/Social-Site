import React from "react";
import "./FollowingCard.css";
import UserProfile from "../User/userProfile";
import { useEffect } from "react";
import {getAllUserApi} from '../../api/userApi'
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const FollowingCard = () => {

  const {user}=useSelector((state)=>state.auth.userData);
  const params = useParams();
  const [Person,setPerson] = useState([]);
  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUserApi(user._id)
      console.log(data);
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
