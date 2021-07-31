import axios from "axios";
import "./messanger.css";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import Message from "../../components/chat/Message";
import Conversation from "../../components/conversations/Conversation";

export default function Messanger() {
  const { currentUser } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);

  async function getConversation() {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/conversations/me",
        {
          headers: {
            Auth: `Bearer ${currentUser.token}`,
          },
        }
      );
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getConversation();
  }, []);
  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {conversations.map((c) => (
              <Conversation
                conversation={c}
                key={c._id}
                currentUser={currentUser}
              />
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <Message own />
            <Message />
            <Message own />
            <input type="text" />
            <button>Send</button>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">Online</div>
        </div>
      </div>
    </>
  );
}
