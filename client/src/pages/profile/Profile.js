import Feed from '../../components/feed/Feed';
import './profile.css';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useParams } from "react-router";
import Rightbar from '../../components/rightbar/Rightbar';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios'

export default function Profile() {
    const { currentUser } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const id = useParams().id;
    console.log(id);

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
