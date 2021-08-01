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
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  async function getConversation() {
    try {
      const res = await axios.get("/api/conversations/me", {
        headers: {
          Auth: `Bearer ${currentUser.token}`,
        },
      });
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getConversation();
  }, []);

  useEffect(() => {
    async function getMessages() {
      try {
        const res = await axios.get("api/messages/" + currentChat);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getMessages();
  }, [currentChat]);
  console.log(messages);
  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c._id)} key={c._id}>
                <Conversation conversation={c} currentUser={currentUser} />
              </div>
            ))}
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {messages.map((message) => (
              <Message
                message={message}
                key={message._id}
                own={message.sender === currentUser.user._id}
              />
            ))}
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
