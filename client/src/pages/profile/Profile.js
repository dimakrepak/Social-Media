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
                    Profile picture
                </div>
                <div className="profile-center">
                    <Rightbar />
                    <Feed id={id} />
                </div>
            </div>
        </>
    )
}
