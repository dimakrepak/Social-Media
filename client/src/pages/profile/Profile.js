import Rightbar from "../../components/rightbar/Rightbar";
import { AddAPhoto } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import { useEffect, useState, useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import Feed from "../../components/feed/Feed";
import { useParams } from "react-router";
import Compressor from "compressorjs";
import axios from "axios";
import "./profile.css";
import EditInput from "../../components/EditInput.js/EditInput";
import { updateUser } from "../../api.calls";

export default function Profile() {
  const { currentUser, dispatch } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [desc, setDesc] = useState(currentUser.user.desc);
  const id = useParams().id;

  useEffect(() => {
    if (id === "me") {
      setUser(currentUser.user);
    } else {
      const fetchUser = async () => {
        try {
          const res = await axios.get(`/api/user?id=${id}`);
          setUser(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchUser();
    }
  }, [id, currentUser]);
  useEffect(() => {
    if (file) {
      new Compressor(file, {
        quality: 0.4,
        success(res) {
          const reader = new FileReader();
          reader.readAsDataURL(res);
          reader.onloadend = () => {
            updateUser(
              currentUser.token,
              { profilePicture: reader.result },
              dispatch
            );

            // window.location.reload();
          };
        },
      });
    }
  }, [file]);

  const handleEditProfile = () => {
    setEditMode(true);
  };
  const handleSaveProfile = async () => {
    if (currentUser.user.desc !== desc) {
      updateUser(currentUser.token, { desc }, dispatch);
    }
    setEditMode(false);
  };

  return (
    <>
      <Navbar />
      <div className="profile">
        <div className="profile-top">
          <div className="profile-top-images">
            <img
              className="profile-cover-image"
              src="https://image.freepik.com/free-vector/network-abstract-connections-with-dots-lines-blue-background_110633-574.jpg"
              alt=""
            />
            <img
              className="profile-user-image"
              src={
                user.profilePicture ||
                "https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png"
              }
              alt=""
            />
            {user._id === currentUser.user._id && (
              <label htmlFor="profile" className="profile-picture__change">
                <AddAPhoto className="profile-picture__change-icon" />
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="profile"
                  accept=".png,.jpeg,.jpg"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            )}
          </div>
          <div className="profile-info">
            <h1 className="profile-username">{user.username}</h1>
            {!editMode ? (
              <span className="profile-desc">{user.desc}</span>
            ) : (
              <EditInput
                profileEdit="profileStatusEdit"
                inputValue={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            )}
            {currentUser.user._id === user._id &&
              (!editMode ? (
                <span
                  className="profile-add-status"
                  onClick={handleEditProfile}
                >
                  Add Status
                </span>
              ) : (
                <span
                  className="profile-add-status"
                  onClick={handleSaveProfile}
                >
                  Save
                </span>
              ))}
          </div>
        </div>
        <div className="profile-center">
          <Rightbar profile={user} />
          <Feed id={id} />
        </div>
      </div>
    </>
  );
}
