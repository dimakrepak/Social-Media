import React from 'react'
import '../login/login.css'
import './register.css'
export default function Register() {
    return (
        <div className="login">
            <div className="login__left"></div>
            <div className="login__right">
                <div className="login-box__register">
                    <form className="login-box__top" >
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            className="login-input"
                        // value={formData.email}
                        // onChange={handleFormChange}
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="login-input"
                        // value={formData.email}
                        // onChange={handleFormChange}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="login-input"
                        // value={formData.password}
                        // onChange={handleFormChange}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="login-input"
                        // value={formData.password}
                        // onChange={handleFormChange}
                        />
                    <button className="create-button__register" >Create New Account</button>
                        <span className="login-forget">Forgot password?</span>
                    </form>
                        <button type="submit"
                            className="login-button"
                        // disabled={isFetching}
                        >
                            {/* {isFetching ? <CircularProgress color="white" size="20px" /> : "Log in"} */}
                        </button>
                </div>
            </div>
        </div>
    )
}
