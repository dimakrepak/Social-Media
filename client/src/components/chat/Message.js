import "./message.css";

export default function Message({ own }) {
  return (
    <div className={`message ${own && "messageOwn"}`}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://i.pinimg.com/originals/fc/04/73/fc047347b17f7df7ff288d78c8c281cf.png"
          alt=""
        />
      </div>
      <div className="messageValue">
        <p>Hello first message</p>
        <div className="messageProp">
          <p className="messageTimeAgo">1 minute ago</p>
        </div>
      </div>
    </div>
  );
}
