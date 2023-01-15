import React from 'react'
import './PostCard.css'
import { useDispatch,useSelector } from 'react-redux'
import Post from '../Post/Post'
import { useEffect } from 'react'
import {getTimelinePostThunk} from '../../redux/action/post'

const PostCard = () => {
  const dispatch = useDispatch();
  const {postData,isLoading}  = useSelector((state)=>state.post);
  const {user} = useSelector((state) => state.auth.userData);


useEffect(() => {
  dispatch(getTimelinePostThunk(user._id))
}, [])


  return (
    <div className='PostCard'>
        {isLoading ? "Fetching Latest Posts":postData.map((data,id)=>{
            return <Post data={data} id={id} />
        })}
    </div>
  )
}

export default PostCard