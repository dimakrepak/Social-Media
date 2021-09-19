import "./chatOnline.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ChatOnline({
  onlineUsers,
  currentUser,
  setCurrentChat,
}) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    async function getFriends() {
      try {
        const result = await axios.get("/api/friends/" + currentUser.user._id, {
          headers: {
            Auth: currentUser.token,
          },
        });
        setFriends(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    getFriends();
  }, []);
  useEffect(() => {
    
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [onlineUsers, friends]);
  
  return (
    <>
      {onlineFriends.map((friend) => (
        <p>{friend.username} is Online</p>
      ))}
    </>
  );
}
