import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { uploadImageApi } from "../../api/uploadImgApi";
import { updateUser } from "../../redux/action/user";
function ProfileEditModal({ open, onClose, data }) {
  const theme = useMantineTheme();

  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImg, setprofileImg] = useState(null);
  const [coverImg, setcoverImg] = useState(null);
  const dispatch = useDispatch();
  const params = useParams();
  const { user } = useSelector((state) => state.auth.userData);

  const hadleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onImageChange = (e) => {
    if (e.target.files[0] !== undefined) {
      e.target.name === "profilePicture"
        ? setprofileImg(e.target.files[0])
        : setcoverImg(e.target.files[0]);
    }
   
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    let userData = formData;

    if (profileImg) {
      const data = new FormData();
      const fileName = Date.now() + profileImg.name;
      data.append("name", fileName);
      data.append("file", profileImg);
      userData.profilePicture = fileName;

      try {
        console.log(data);
        dispatch(uploadImageApi(data));
      } catch (error) {
        console.log(error);
      }
    }

    if (coverImg) {
      const data = new FormData();
      const fileName = Date.now() + coverImg.name;
      data.append("name", fileName);
      data.append("file", coverImg);
      userData.coverPicture = fileName;

      try {
        console.log(data);
        dispatch(uploadImageApi(data));
      } catch (error) {
        console.log(error);
      }
    }

    dispatch(updateUser({id:params.id, data:userData}));
    onClose(false);
  };
    
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={open}
      onClose={() => onClose(false)}
    >
      <form className="infoForm">
        <h3>Your info</h3>

        <div>
          <input
            type="text"
            className="infoInput"
            name="firstname"
            placeholder="First Name"
            onChange={hadleChange}
            value={formData.firstname}
          />

          <input
            type="text"
            className="infoInput"
            name="lastname"
            placeholder="Last Name"
            onChange={hadleChange}
            value={formData.lastname}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="worksAt"
            placeholder="Works at"
            onChange={hadleChange}
            value={formData.worksAt}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="from"
            placeholder="LIves in"
            onChange={hadleChange}
            value={formData.from}
          />

          <input
            type="text"
            className="infoInput"
            name="country"
            placeholder="Country"
            onChange={hadleChange}
            value={formData.country}
          />
        </div>

        <div>
          <input
            type="text"
            className="infoInput"
            name="relationship"
            placeholder="RelationShip Status"
            onChange={hadleChange}
            value={formData.relationship}
          />
        </div>

        <div>
          Profile Image
          <input type="file" name="profilePicture" onChange={onImageChange} />
          Cover Image
          <input type="file" name="coverPicture" onChange={onImageChange} />
        </div>

        <button onClick={handleUpdate} className="button infoButton">
          Update
        </button>
      </form>
    </Modal>
  );
}

export default ProfileEditModal;
