import "./leftbar.css";

export default function Leftbar() {
  return (
    <div className="leftbar-container">
      <ul className="leftbar__list">
        <div className="leftbar__list-title">
          <span className="leftbar-categories">Pages</span>
        </div>
        <li className="leftbar__list-item">Home</li>
        <li className="leftbar__list-item">Messenger</li>
        <li className="leftbar__list-item">My Profile</li>
      </ul>
      <ul className="leftbar__list">
        <div className="leftbar__list-title">
          <span className="leftbar-categories">Events</span>
        </div>
        <li className="leftbar__list-item">Birthdays</li>
        <li className="leftbar__list-item">Public</li>
        <li className="leftbar__list-item">In my location</li>
      </ul>
      <div className="leftbar__list-title">
        <span className="leftbar-categories">Settings</span>
      </div>
    </div>
  );
}
