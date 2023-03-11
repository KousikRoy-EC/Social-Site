import React from 'react'
import './PostCard.css'
import { useDispatch,useSelector } from 'react-redux'
import Post from '../Post/Post'
import { useEffect } from 'react'
import {getTimelinePostThunk} from '../../redux/action/post'
import { useParams } from "react-router-dom";

const PostCard = () => {
  const params = useParams()
  const dispatch = useDispatch();
  const {postData,isLoading ,error}  = useSelector((state)=>state.post);
  const {user} = useSelector((state) => state.auth.userData);

useEffect(() => {
  dispatch(getTimelinePostThunk(user._id))
}, [])

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (isLoading || !postData) {
    return <div>Loading...</div>;
  }

  let filteredData = postData;
  if (params.id) {
    filteredData = postData.filter((post) => post.userId === params.id);
  }

  if (!Array.isArray(filteredData) || filteredData.length === 0) {
    return <div>No Posts</div>;
  }

  return (

    <div className="PostCard">
    {filteredData.map((data, id) => {
      return <Post data={data} id={id} />;
    })}
  </div>
  )
}

export default PostCard