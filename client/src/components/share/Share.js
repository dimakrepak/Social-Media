import './share.css'
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { PhotoLibrary } from "@material-ui/icons";
import axios from 'axios'

export default function Share() {
    const { currentUser } = useContext(AuthContext);
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState(null)

    const handleShareClick = async () => {
        try {
            await axios.post(`/api/posts/create`, {
                body: desc,
                img: file
            },
                {
                    headers: {
                        'Auth': `Bearer ${currentUser.token}`
                    }
                }
            )
        } catch (err) {
            console.log(err);
        }
        console.log('click');
    }


    return (
        <div className="share-container">
            <div className="share__top">
                <img
                    className="share-profile-picture"
                    src={currentUser.user.profilePicture ? currentUser.user.profilePicture : '/assets/profile/pic1.jpeg'}
                    alt='' />
                <div className="share-input">
                    <input
                        type="text"
                        value={desc}
                        placeholder={`What's on your mind, ${currentUser.user.username} ?`} className="share-input__input"
                        onChange={(e) => { setDesc(e.target.value) }}
                    />
                </div>
            </div>
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
                <button className="share-button" onClick={handleShareClick}>Share</button>
            </div>
        </div >
    )
}
