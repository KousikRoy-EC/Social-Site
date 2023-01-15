import React, { useState, useRef } from "react";
import ProfileImage from "../../img/profileImg.jpg";
import "./SharePost.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useSelector, useDispatch } from "react-redux";
import { uploadImageThunk, uploadPostThunk } from "../../redux/action/post";


const SharePost = () => {
  
const serverImg = process.env.REACT_APP_PUBLIC_FOLDER;
  const dispatch = useDispatch();
  const [img, setimg] = useState(null);
  const imgRef = useRef();
  const descRef = useRef();
  const { user } = useSelector((state) => state.auth.userData);
  const {isLoading} = useSelector((state) => state.post);
  const onImgChange = (e) => {
    if (e.target.files[0] === undefined) {
      return;
    }
    setimg(e.target.files[0]);
  };

  const resetSharePost = () => {
    setimg(null);
    descRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postForm = {
      userId: user._id,
      desc: descRef.current.value,
    };
    if (img) {
      const data = new FormData();
      const fileName = Date.now() + img.name;
      data.append("name", fileName);
      data.append("file", img);
      postForm.img = fileName;
      try{
        dispatch(uploadImageThunk(data));
      }
      catch(err){
        console.log(err);
      }
     console.log(data);
    }
  
    dispatch(uploadPostThunk(postForm));
    resetSharePost();
  };
  return (
    <div className="SharePost">
      <img src={user.profilePicture ?serverImg+user.profilePicture:serverImg+"defaultProfileImg.png" } alt="img" />
      <div>
        <input
          ref={descRef}
          required
          type="text"
          placeholder="What is in your mind?"
        />

        <div className="Post-opt">
          <div
            className="opt"
            style={{ color: "var(--photo)" }}
            onClick={() => imgRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>
          <div className="opt" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Video
          </div>
          <div className="opt" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>

          <button style={{disabled : isLoading ? true:false}} onClick={handleSubmit} className="sharebtn button">
            { isLoading ? "Uploading":"Share"}
          </button>
          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imgRef}
              onChange={onImgChange}
            />
          </div>
        </div>

        {img && (
          <div className="imgPreview">
            <UilTimes
              onClick={() => setimg(null)}
              style={{ cursor: "Pointer" }}
            />
            <img src={URL.createObjectURL(img)} alt="img" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SharePost;
