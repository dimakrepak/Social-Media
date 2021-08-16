import "./message.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { format } from "timeago.js";

export default function Message({ message, own, currentUser, receiverUser }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (currentUser && receiverUser) {
      if (own) {
        setUser(currentUser.user);
      } else {
        setUser(receiverUser);
      }
    }
  }, []);
  return (
    <div className={`message ${own && "messageOwn"}`}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            user?.profilePicture ||
            "https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png"
          }
          alt=""
        />
        <span>{user?.username}</span>
      </div>
      <div style={{ backgroundColor: own && "grey" }} className="messageValue">
        <span>{message.text}</span>
        <div className="messageProp">
          <span className="messageTimeAgo">{format(message.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
