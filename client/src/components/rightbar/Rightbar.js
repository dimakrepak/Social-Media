import './rightbar.css';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Edit, SaveRounded } from "@material-ui/icons";
import { AuthContext } from '../../context/AuthContext';
import { Link } from "react-router-dom";
import EditInput from '../EditInput.js/EditInput';
import { updateUser } from '../../api.calls';

export default function Rightbar({ profile }) {

    const { currentUser, dispatch } = useContext(AuthContext);
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
    //inner PROFILE Component
    const ProfileRightbar = () => {
        const [friends, setFriends] = useState([]);
        const [followed, setFollowed] = useState(currentUser.user.following.includes(profile?._id));
        const [editMode, setEditMode] = useState(false);
        const [introEdit, setIntroEdit] = useState({

            city: `${currentUser.user.city}`,
            from: `${currentUser.user.from}`,
            languages: `${currentUser.user.languages}`,
            hobbies: `${currentUser.user.hobbies}`,
        })
        const handleEditChange = (e) => {
            setIntroEdit({
                ...introEdit,
                [e.target.name]: e.target.value
            })
        }
        const handleEditModeClick = async () => {
            setEditMode(!editMode)
            setIntroEdit({
                city: `${currentUser.user.city}`,
                from: `${currentUser.user.from}`,
                languages: `${currentUser.user.languages}`,
                hobbies: `${currentUser.user.hobbies}`,
            })
        }
        const handleSaveModeClick = async () => {
            updateUser(currentUser.token, ({ ...introEdit }), dispatch)
        }
        const fetchFriends = async () => {
            try {
                const friendsRes = await axios.get(`/api/friends/${profile?._id}`, {
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
        }, [])

        const handleFollowClick = async () => {
            try {
                if (followed) {
                    await axios.put(`/api/users/${profile._id}/unfollow`, {}, {
                        headers: {
                            'Auth': `Bearer ${currentUser.token}`
                        }
                    });
                    dispatch({ type: 'UNFOLLOW', payload: profile._id })
                } else {
                    await axios.put(`/api/users/${profile._id}/follow`, {}, {
                        headers: {
                            'Auth': `Bearer ${currentUser.token}`
                        }
                    });
                    dispatch({ type: 'FOLLOW', payload: profile._id })
                }
                setFollowed(!followed)
            } catch (err) {
                console.log(err);
            }
        }
        return (
            <>
                {currentUser.user._id !== profile._id &&
                    <button className="follow-btn" onClick={handleFollowClick}>
                        {followed ? 'Unfollow' : 'Follow'}
                    </button>
                }
                {/* ---------------------------------- MAKE THIS COMPONENT IN THE FUTURE !!!!------------------------------ */}
                <div className="profile-rightbar__intro">
                    {editMode ?
                        <h2>Edit Intro</h2>
                        :
                        <h2>Intro</h2>
                    }
                    <div className="profile-rightbar-info__item">
                        <span className="profile-info__key">City: </span>
                        {!editMode ?
                            <span className="profile-info__value">{profile.city}</span>
                            :
                            <EditInput
                                inputValue={introEdit.city}
                                onChange={handleEditChange}
                                name='city'
                            />
                        }
                    </div>
                    <div className="profile-rightbar-info__item">
                        <span className="profile-info__key">From: </span>
                        {!editMode ?
                            <span className="profile-info__value">{profile.from}</span>
                            :
                            <EditInput
                                inputValue={introEdit.from}
                                onChange={handleEditChange}
                                name='from'
                            />
                        }
                    </div>
                    <div className="profile-rightbar-info__item">
                        <span className="profile-info__key">Languages: </span>
                        {!editMode ?
                            <span className="profile-info__value">{profile.languages}</span>
                            :
                            <EditInput
                                inputValue={introEdit.languages}
                                onChange={handleEditChange}
                                name='languages'
                            />
                        }
                    </div>
                    <div className="profile-rightbar-info__item">
                        <span className="profile-info__key">Hobbies: </span>
                        {!editMode ?
                            <span className="profile-info__value">{profile.hobbies}</span>
                            :
                            <EditInput
                                inputValue={introEdit.hobbies}
                                onChange={handleEditChange}
                                name="hobbies"
                            />
                        }
                    </div>
                    {currentUser.user._id === profile._id &&
                        <button className="profile-rightbar-info__edit" onClick={handleEditModeClick}>
                            <Edit className="profile-rightbar-info__edit-icon" />
                        </button>
                    }
                    {editMode &&
                        <button className="profile-rightbar-info__save" onClick={handleSaveModeClick}>
                            <SaveRounded />
                            <span>Save</span>
                        </button>
                    }
                </div>
                {/* --------------------------------------------------------------------------------------- */}
                <div className="profile-rightbar-friends">
                    <h2>Friends</h2>
                    <span className="profile-rightbar-friends-amount">{friends.length} friends</span>
                    <div className="profile-rightbar-friends__wrapper">
                        {friends &&
                            friends.map((friend) => (
                                <div className="profile-friend_item" key={friend._id}>
                                    <Link className="router-link" to={`/profile/${friend._id}`}>
                                        <img
                                            className="profile-friend-img"
                                            src={friend.profilePicture || "https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png"}
                                            alt=""
                                        />
                                    </Link>
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
