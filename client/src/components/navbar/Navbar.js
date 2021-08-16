import "./navbar.css";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { logoutPost } from "../../api.calls";
import {
  Person,
  Search,
  Notifications,
  SendRounded,
  HomeRounded,
  ExitToAppRounded,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { currentUser, dispatch } = useContext(AuthContext);
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState([]);

  const handleLogOutClick = async () => logoutPost(currentUser.token, dispatch);
  const fetchSearchUsers = async () => {
    try {
      const result = await axios.get(`/api/search/${searchValue}`);
      console.log(result.data);
      setUsers(result.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (searchValue) {
      fetchSearchUsers();
    }
  }, [searchValue]);

  return (
    <div className="navbar-container">
      <div className="navbar__left">
        <Link className="router-link" to="/">
          <span className="navbar-logo">SOCIAL.ME {"</>"}</span>
        </Link>
      </div>
      <div className="navbar__center">
        <div className="navbar-searchbar">
          <Search className="navbar-searchbar__logo" />
          <input
            type="text"
            value={searchValue}
            placeholder="Search"
            className="navbar-searchbar__input"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          {/* LAZY SEARCH DROPDOWN */}
          {searchValue && (
            <div className="navbar__center-dropdown">
              <ul className="navbar__center-results">
                {users.map((user) => (
                  <li className="navbar__center-dropdown-friend">
                    <Link
                      className="router-link"
                      key={user._id}
                      to={
                        user._id === currentUser.user._id
                          ? `/profile/me`
                          : `/profile/${user._id}`
                      }
                    >
                      <div className="navbar__center-img-container">
                        <img
                          className="navbar__center-img"
                          src={
                            user.profilePicture ||
                            "https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png"
                          }
                          alt=""
                        />
                      </div>
                      <span className="result-friend_username">
                        {user.username}
                      </span>
                    </Link>
                    <button>Send Message</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="navbar__right">
        <Link className="navbar-home__link" to="/">
          <HomeRounded className="navbar-icons__icon-material" />
        </Link>
        <div className="navbar-icons">
          <div className="navbar-icons__icon">
            <Person className="navbar-icons__icon-material" />
          </div>
          <div className="navbar-icons__icon">
            <Notifications className="navbar-icons__icon-material" />
          </div>
          <div className="navbar-icons__icon">
            <Link className="navbar-home__link" to="/messanger">
              <SendRounded className="navbar-icons__icon-material" />
            </Link>
          </div>
        </div>
        <div className="navbar-profile-navbar__container">
          <Link className="router-link" to={`/profile/me`}>
            <div className="navbar-profile">
              <img
                src={
                  currentUser.user.profilePicture
                    ? currentUser.user.profilePicture
                    : "https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png"
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
  );
}
