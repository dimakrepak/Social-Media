import "./login.css";
import { useState, useContext } from "react";
import { useHistory } from "react-router";
import { loginPost } from "../../api.calls";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

export default function Login() {
  const { isFetching, error, dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLoginClick = (e) => {
    e.preventDefault();
    console.log("click");
    loginPost({ ...formData }, dispatch);
    setFormData({
      ...formData,
      password: "",
    });
  };
  return (
    <div className="login">
      <img
        className="landing-page__image"
        src="https://picsum.photos/3000/2000"
        alt=""
      />
      <div className="login__left"></div>
      <div className="login__right">
        <div className="login-box">
          <form className="login-box__top" onSubmit={handleLoginClick}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="login-input"
              value={formData.email}
              onChange={handleFormChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="login-input"
              value={formData.password}
              onChange={handleFormChange}
            />
            <button
              type="submit"
              className="login-button"
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log in"
              )}
            </button>
            <span className="login-forget">Forgot password?</span>
            {error && (
              <span style={{ color: "red" }}>Invalid Information!</span>
            )}
          </form>
          <button
            className="create-button"
            disabled={isFetching}
            onClick={() => {
              history.push("/register");
            }}
          >
            Create New Account
          </button>
        </div>
      </div>
    </div>
  );
}
