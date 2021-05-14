import './navbar.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
import { Person, Search, Notifications, Forum, Dns } from '@material-ui/icons'
import { Link } from "react-router-dom"
export default function Navbar() {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="navbar-container">
            <div className="navbar__left">
                <span className="navbar-logo">SOCIAL.ME {'</>'}</span>
            </div>
            <div className="navbar__center">
                <div className="navbar-searchbar">
                    <Search className="navbar-searchbar__logo" />
                    <input type="text" placeholder="Search" className="navbar-searchbar__input" />
                </div>
            </div>
            <div className="navbar__right">
                <Dns className="navbar-icons__icon" />
                <div className="navbar-icons">
                    <div className="navbar-icons__icon">
                        <Person />
                    </div>
                    <div className="navbar-icons__icon" >
                        <Notifications />
                    </div>
                    <div className="navbar-icons__icon">
                        <Forum />
                    </div>
                </div>
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
            </div>
        </div>
    )
}
