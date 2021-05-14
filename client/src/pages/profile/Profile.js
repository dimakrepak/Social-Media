import Feed from '../../components/feed/Feed';
import './profile.css';
import { useEffect, useState } from 'react';
import { useParams } from "react-router";
import Rightbar from '../../components/rightbar/Rightbar';
import Navbar from '../../components/navbar/Navbar';

export default function Profile() {
    const [user, setUser] = useState({});
    const id = useParams().id;
    console.log(id);
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
                            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                            alt=""
                        />
                    </div>
                    <div className="profile-info">
                        <h1 className="profile-username">Dmitry Krepak</h1>
                        <span className="profile-desc">Hi Im in love with falafel and good shnitzel</span>
                    </div>
                </div>
                <div className="profile-center">
                    <Rightbar profile />
                    <Feed id={id} />
                </div>
            </div>
        </>
    )
}
