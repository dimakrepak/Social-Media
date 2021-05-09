import './share.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { PhotoLibrary } from "@material-ui/icons";

export default function Share() {
    const { currentUser } = useContext(AuthContext);
    return (
        <div className="share-container">
            <div className="share__top">
                <img
                    className="share-profile-picture"
                    src={currentUser.user.profilePicture ? currentUser.user.profilePicture : '/assets/profile/pic1.jpeg'}
                    alt='' />
                <div className="share-input">
                    <input type="text" placeholder={`What's on your mind, ${currentUser.user.username} ?`} className="share-input__input" />
                </div>
            </div>
            <div className="share__bottom">
                <div className="share-option">
                    <PhotoLibrary className="share-icon" />
                    <span className="share-option__text">Photo/Video</span>
                </div>
                <button className="share-button">Share</button>
            </div>
        </div>
    )
}
