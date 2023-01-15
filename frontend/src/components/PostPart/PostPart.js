import React from 'react'
import SharePost from '../SharePost/SharePost'
import PostCard from '../PostCard/PostCard'
import './PostPart.css'

const PostPart = () => {
  return (
    <div className='PostPart'>
      <SharePost />
      <PostCard />
    </div>
  )
}

export default PostPart