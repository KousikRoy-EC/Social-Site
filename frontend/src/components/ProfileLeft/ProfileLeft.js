import React from 'react'
import FollowingCard from '../FollowingCard/FollowingCard'
import ProfileInfoCard from '../ProfileInfoCard/ProfileInfoCard'
import LogoSearchComponent from '../LogoSearchComponent/LogoSearchComponent'
import './ProfileLeft.css'
const ProfileLeft = () => {
  return (
    <div className='ProfileLeft'>
        <LogoSearchComponent />
        <ProfileInfoCard />
        <FollowingCard />
    </div>
  )
}

export default ProfileLeft