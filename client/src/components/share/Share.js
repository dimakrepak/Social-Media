import './share.css'
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { PhotoLibrary, RedeemRounded } from "@material-ui/icons";
import axios from 'axios'

export default function Share() {
    const { currentUser } = useContext(AuthContext);
    const [desc, setDesc] = useState('');
    const [file, setFile] = useState('');
    const [imgStr, setImgStr] = useState('');

    useEffect(() => {
        if (file) {
            const reader = new FileReader();
            console.log(file);
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setImgStr(reader.result)
            }
        }
    }, [file])

    const handleShareClick = async () => {
        const newPost = {
            body: desc,
        }
        if (imgStr) {
            console.log(imgStr);
            newPost.img = imgStr
            console.log(newPost);
        }
        try {
            await axios.post("api/posts/create", newPost, {
                headers: {
                    'Auth': `Bearer ${currentUser.token}`
                }
            });
            window.location.reload();
        } catch (err) { }
        console.log('click');
        setImgStr('');
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
