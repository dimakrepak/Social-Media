import axios from "axios";
import "./conversation.css";
import { useContext, useState, useEffect } from "react";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState("");
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

  return (
    <div className="conversation">
      <img
        className="conversation-picture"
        src={
          user.profilePicture ||
          "https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png"
        }
        alt=""
      />
      <span className="conversation-username">{user.username}</span>
    </div>
  );
}
