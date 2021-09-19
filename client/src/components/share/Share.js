import "./share.css";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PhotoLibrary, Clear } from "@material-ui/icons";
import Compressor from "compressorjs";
import axios from "axios";

export default function Share() {
  const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState("");
  const [imgStr, setImgStr] = useState("");

  useEffect(() => {
    if (file) {
      new Compressor(file, {
        quality: 0.4,
        success(res) {
          const reader = new FileReader();
          reader.readAsDataURL(res);
          reader.onloadend = () => {
            setImgStr(reader.result);
          };
        },
      });
    }
  }, [file]);

  const handleShareClick = async () => {
    const newPost = {
      body: desc,
    };
    if (imgStr) {
      newPost.img = imgStr;
    }
    try {
      await axios.post("/api/posts/create", newPost, {
        headers: {
          Auth: `Bearer ${currentUser.token}`,
        },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
    setImgStr("");
  };
  const handleShareImageClear = async () => {
    setFile("");
    setImgStr("");
  };

  return (
    <div className="share-container">
      <div className="share__top">
        <img
          className="share-profile-picture"
          src={
            currentUser.user.profilePicture
              ? currentUser.user.profilePicture
              : "https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png"
          }
          alt=""
        />
        <div className="share-input">
          <input
            type="text"
            value={desc}
            placeholder={`What's on your mind, ${currentUser.user.username} ?`}
            className="share-input__input"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
        </div>
      </div>
      {file && (
        <div className="share-image__preview-container">
          <img className="share-image__preview" src={imgStr} alt="" />
          <button
            className="share-image__clear"
            onClick={handleShareImageClear}
          >
            <Clear className="share-image__clear-icon" />
          </button>
        </div>
      )}
      <div className="share__bottom">
        <label htmlFor="file" className="share-option">
          <PhotoLibrary className="share-icon" />
          <span className="share-option__text">Photo/Video</span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            accept=".png,.jpeg,.jpg"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>
        <button className="share-button" onClick={handleShareClick}>
          Share
        </button>
      </div>
    </div>
  );
}
