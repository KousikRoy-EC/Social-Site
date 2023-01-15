import React from 'react'
import ProfilePart from '../../components/ProfilePart/ProfilePart'
import PostPart from '../../components/PostPart/PostPart'
import NotificationPart from '../../components/NotificationPart/NotificationPart'
import './home.css'
const home = () => {
  return (
    <div className="Home">
        <ProfilePart
        />
        <PostPart/>
        <NotificationPart/>
    </div>
  )
}

export default home