import './rightbar.css';

export default function Rightbar() {
    return (
        <div className="rightbar-container">
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
                                src="assets/profile/noavatar.png"
                                alt=""
                            />
                            <span className="right-bar__online"></span>
                        </div>
                        <span className="online-friend_username">Sergey123</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
