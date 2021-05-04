import './navbar.css'
import { Person, Search, Notifications, Forum } from '@material-ui/icons'
export default function Navbar() {
    return (
        <div className="navbar-container">
            <div className="navbar__left">
                <span className="navbar-logo">SOCIALMEDIA</span>
                <span className="navbar-link">Homepage</span>
                <span className="navbar-link">Timeline</span>
            </div>
            <div className="navbar__center">
                <div className="navbar-searchbar">
                    <Search className="navbar-searchbar__logo" />
                    <input type="text" placeholder="Search" className="navbar-searchbar__input" />
                </div>
            </div>
            <div className="navbar__right">
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
                <img src="/assets/profile/pic1.jpeg" alt="" className="navbar-profile-picture" />
            </div>
        </div>
    )
}
