import './rightbar.css';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Rightbar({ profile }) {
    const { currentUser } = useContext(AuthContext);


    //inner Component
    const HomeRightbar = () => {
        return (
            <>
                <div className="rightbar-ads">
                    <span className="right-ads__span">Sponsored</span>
                    <img
                        className="rightbar-ad__img"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST4oxkbWSxPPWH00l8CoZzVhH2aew4ScQGmQ&usqp=CAU"
                        alt=""
                    />
                    <img
                        className="rightbar-ad__img"
                        src="https://www.disruptivestatic.com/wp-content/uploads/2013/12/Place-ad-here_Image.jpg"
                        alt=""
                    />
                </div>
                <div className="right-bar__friends-container">
                    <span className="right-ads__span">Online Friends</span>
                    <ul className="right-bar__friendslist">
                        <li className="right-bar__online-friend">
                            <div className="right-bar__profile-img-container">
                                <img
                                    className="right-bar__profile-img"
                                    src="https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png"
                                    alt=""
                                />
                                <span className="right-bar__online"></span>
                            </div>
                            <span className="online-friend_username">Sergey123</span>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
    //inner Component
    const ProfileRightbar = () => {
        const [friends, setFriends] = useState([])
        const fetchFriends = async () => {
            if (profile._id)
                try {
                    const friendsRes = await axios.get(`/api/friends/${profile._id}`, {
                        headers: {
                            'Auth': `Bearer ${currentUser.token}`
                        }
                    })
                    console.log(friendsRes.data);
                    setFriends(friendsRes.data)
                } catch (err) {
                    console.log(err)
                }
        }

        useEffect(() => {
            fetchFriends()
        }, [profile])
        return (
            <>
                <div className="profile-rightbar__intro">
                    <h2>Intro</h2>
                    <div className="profile-rightbar-info__item">
                        <span className="profile-info__key">City: </span>
                        <span className="profile-info__value">Rishon Lezion</span>
                    </div>
                    <div className="profile-rightbar-info__item">
                        <span className="profile-info__key">From: </span>
                        <span className="profile-info__value">Israel</span>
                    </div>
                    <div className="profile-rightbar-info__item">
                        <span className="profile-info__key">Languages: </span>
                        <span className="profile-info__value">Spanish, Hebrew</span>
                    </div>
                    <div className="profile-rightbar-info__item">
                        <span className="profile-info__key">Hobbies: </span>
                        <span className="profile-info__value">Code</span>
                    </div>
                </div>
                <div className="profile-rightbar-friends">
                    <h2>Friends</h2>
                    <span className="profile-rightbar-friends-amount">{friends.length} friends</span>
                    <div className="profile-rightbar-friends__wrapper">
                        {friends.map((friend) => (
                            <div className="profile-friend_item" key={friend._id}>
                                <img
                                    className="profile-friend-img"
                                    src={friend.profilePicture || "https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png"}
                                    alt=""
                                />
                                <span className="profile-friend_item-username">{friend.username}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        )
    }
    return (
        <div className="rightbar-container">
            {
                profile ?
                    <ProfileRightbar />
                    :
                    < HomeRightbar />
            }
        </div>
    )
}
