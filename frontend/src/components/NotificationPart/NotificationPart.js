import React from 'react'
import './NotificationPart.css'
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from "../TrendCard/TrendCard";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const NotificationPart = () => {
  const {user}=useSelector(state=>state.auth.userData)

  return (
    <div className="NotificationPart">
    <div className="navBarIcons">
    <Link style={{textDecoration:"none",color:"inherit"}} to={`/home`}  ><img src={Home} alt="" /></Link>
      <UilSetting />
      <img src={Noti} alt="" />
      <img src={Comment} alt="" />
    </div>

    <TrendCard />
  </div>
  )
}

export default NotificationPart