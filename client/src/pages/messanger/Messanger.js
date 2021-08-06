import axios from "axios";
import "./messanger.css";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import Message from "../../components/chat/Message";
import Conversation from "../../components/conversations/Conversation";
import { io } from "socket.io-client";
import ChatOnline from "../../components/ChatOnline/ChatOnline";

export default function Messanger() {
  const { currentUser } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState({});
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef(io("ws://localhost:8900"));
  const scrollRef = useRef();
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
        const res = await axios.get("api/messages/" + currentChat._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getMessages();
  }, [currentChat]);

  async function handleChatSendButton(e) {
    e.preventDefault();
    const message = {
      sender: currentUser.user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    socket.current.emit("sendMessage", {
      sender_id: currentUser.user._id,
      receiver_id: currentChat?.members.find((m) => m !== currentUser.user._id),
      text: newMessage,
    });
    try {
      const res = await axios.post("/api/messages/create", message, {
        headers: { Auth: currentUser.token },
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    // console.log(scrollRef);
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.current.emit("addUser", currentUser.user._id);
    socket.current.on("getOnlineUsers", (users) => {
      console.log(socket.current.id);
      users = users.map((user) => user.user_id);
      console.log(users);
      setOnlineUsers(
        currentUser.user.following.filter((friendId) =>
          users.includes(friendId)
        )
      );
    });
  }, [socket.current]);
  useEffect(() => {
    socket.current.on("getMessage", (message) => {
      console.log(message);
      setArrivalMessage({
        sender: message.sender_id,
        text: message.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    if (
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender)
    ) {
      setMessages((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, currentChat]);
  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)} key={c._id}>
                <Conversation conversation={c} currentUser={currentUser} />
              </div>
            ))}
          </div>
        </div>

        <div className="chatBox">
          <div className="chatBoxWrapper">
            {messages.map((message) => (
              <div ref={scrollRef} key={message._id}>
                <Message
                  key={message._id}
                  message={message}
                  own={message.sender === currentUser.user._id}
                />
              </div>
            ))}
          </div>
          <input
            className="chatMessangerInput"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="chatSendButton" onClick={handleChatSendButton}>
            Send
          </button>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUser={currentUser}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}
