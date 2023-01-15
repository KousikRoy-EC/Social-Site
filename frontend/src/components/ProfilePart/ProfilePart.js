import React from 'react'
import LogoSearchComponent from '../LogoSearchComponent/LogoSearchComponent'
import ProfileCard from '../ProfileCard/ProfileCard'
import FollowingCard from '../FollowingCard/FollowingCard'
import './ProfilePart.css'
const ProfilePart = () => {
  return (
    <div className='ProfilePart'>
        <LogoSearchComponent />
        <ProfileCard render="homePage"/>
        <FollowingCard />
    </div>
  )
}

export default ProfilePart
