import "./messanger.css";
import Navbar from "../../components/navbar/Navbar";
import Message from "../../components/chat/Message";

export default function Messanger() {
  return (
    <>
      <Navbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">Menu</div>
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
