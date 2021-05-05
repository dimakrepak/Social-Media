import './share.css'
import { PhotoLibrary } from "@material-ui/icons"
export default function Share() {
    return (
        <div className="share-container">
            <div className="share__top">
                <img className="share-profile-picture" src='/assets/profile/pic1.jpeg' alt='' />
                <div className="share-input">
                    <input type="text" placeholder="What's on your mind, Dima?" className="share-input__input" />
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
