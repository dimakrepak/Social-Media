import Rightbar from '../../components/rightbar/Rightbar';
import { AddAPhoto } from "@material-ui/icons";
import { AuthContext } from '../../context/AuthContext';
import { useEffect, useState, useContext } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Feed from '../../components/feed/Feed';
import { useParams } from "react-router";
import Compressor from 'compressorjs';
import axios from 'axios'
import './profile.css';

export default function Profile() {
    const { currentUser, dispatch } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [file, setFile] = useState(null);
    const id = useParams().id;

    useEffect(() => {
        if (id === 'me') {
            setUser(currentUser.user)
        } else {
            const fetchUser = async () => {
                try {
                    const res = await axios.get(`/api/user?id=${id}`)
                    console.log(res.data);
                    setUser(res.data);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchUser();
        }
    }, [id]);
    useEffect(() => {
        if (file) {
            new Compressor(file, {
                quality: 0.4,
                success(res) {
                    const reader = new FileReader();
                    reader.readAsDataURL(res)
                    reader.onloadend = () => {
                        updateProfilePicture(reader.result)
                        dispatch({ type: 'UPDATE', payload: reader.result })
                        window.location.reload();
                    }
                }
            })
        }
    }, [file])
    const updateProfilePicture = async (data) => {
        try {
            await axios.post(`/api/user/update`, ({ image: data }), {
                headers: {
                    'Auth': `Bearer ${currentUser.token}`,
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <Navbar />
            <div className="profile">
                <div className="profile-top">
                    <div className="profile-top-images">
                        <img
                            className="profile-cover-image"
                            src="https://www.webfx.com/blog/wp-content/uploads/2014/06/blur-branding-check-1032109.jpg"
                            alt=""
                        />
                        <img
                            className="profile-user-image"
                            src={user.profilePicture || "https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png"}
                            alt=""
                        />
                        {user._id === currentUser.user._id &&
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
                        }
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-username">{user.username}</h1>
                        <span className="profile-desc">Hi Im in love with falafel and good shnitzel</span>
                    </div>
                </div>
                <div className="profile-center">

                    <Rightbar profile={user} />
                    <Feed id={id} />
                </div>
            </div>
        </>
    )
}
