import axios from "axios";
import "./conversation.css";
import { useState, useEffect } from "react";

export default function Conversation({
  conversation,
  currentUser,
  onlineUsers,
}) {
  const [user, setUser] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  useEffect(() => {
    const friendId = conversation?.members.find(
      (m) => m !== currentUser.user._id
    );
    const getUser = async () => {
      try {
        const res = await axios.get("/api/user?id=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [conversation]);

  useEffect(() => {
    const friendId = conversation?.members.find(
      (m) => m !== currentUser.user._id
    );
    setIsOnline(onlineUsers.some((user) => user.user_id === friendId));
  }, [onlineUsers, currentUser]);

  return (
    <li className="right-bar__online-friend">
      <div className="right-bar__profile-img-container">
        <img
          className="right-bar__profile-img"
          src={
            user?.profilePicture ||
            "https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png"
          }
          alt=""
        />
        {isOnline ? (
          <span className="right-bar__status right-bar__status-online">
            online
          </span>
        ) : (
          <span className="right-bar__status right-bar__status-offline">
            offline
          </span>
        )}
      </div>
      <span className="online-friend_username">{user?.username}</span>
    </li>
  );
}
