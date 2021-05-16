import './navbar.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { logoutPost } from '../../api.calls';
import { Person, Search, Notifications, SendRounded, HomeRounded, ExitToAppRounded } from '@material-ui/icons';
import { Link } from "react-router-dom";

export default function Navbar() {
    const { currentUser, dispatch } = useContext(AuthContext);
    const handleLogOutClick = async () => {

        logoutPost(currentUser.token, dispatch)

    }
    return (
        <div className="navbar-container">
            <div className="navbar__left">
                <Link className="router-link" to="/">
                    <span className="navbar-logo">SOCIAL.ME {'</>'}</span>
                </Link>
            </div>
            <div className="navbar__center">
                <div className="navbar-searchbar">
                    <Search className="navbar-searchbar__logo" />
                    <input type="text" placeholder="Search" className="navbar-searchbar__input" />
                </div>
            </div>
            <div className="navbar__right">
                <Link className="router-link" to="/">
                    <HomeRounded className="navbar-icons__icon-material" />
                </Link>
                <div className="navbar-icons">
                    <div className="navbar-icons__icon">
                        <Person className="navbar-icons__icon-material" />
                    </div>
                    <div className="navbar-icons__icon" >
                        <Notifications className="navbar-icons__icon-material" />
                    </div>
                    <div className="navbar-icons__icon">
                        <SendRounded className="navbar-icons__icon-material" />
                    </div>
                </div>
                <div className="navbar-profile-navbar__container">
                    <Link className="router-link" to={`/profile/me`}>
                        <div className="navbar-profile">
                            <img
                                src={currentUser.user.profilePicture ?
                                    currentUser.user.profilePicture
                                    :
                                    'https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png'
                                }
                                alt=""
                                className="navbar-profile__picture"
                            />
                            <span className="navbar-link">{currentUser.user.username}</span>
                        </div>
                    </Link>
                    <div className="navbar-logout" onClick={handleLogOutClick}>
                        <ExitToAppRounded />
                    </div>
                </div>
            </div>
        </div>
    )
}
