import './login.css'

export default function Login() {
    return (
        <div className="login">
            <div className="login__left"></div>
            <div className="login__right">
                <div className="login-box">
                    <div className="login-box__top">
                        <input type="text" placeholder="Email" className="login-input" />
                        <input type="text" placeholder="Password" className="login-input" />
                        <button className="login-button">Log in</button>
                        <span className="login-forget">Forgot password?</span>
                    </div>
                    <button className="create-button">Create New Account</button>
                </div>
            </div>

        </div>
    )
}

