import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { registerPost } from '../../api.calls';
import { useHistory } from 'react-router';
import '../login/login.css';
import './register.css';

export default function Register() {
    const { currentUser, isFetching, error, dispatch } = useContext(AuthContext);
    const [account, setAccount] = useState({
        username: '',
        email: '',
        password: '',
        confirm_password: ''
    })
    const history = useHistory();

    const handleFormChange = (e) => {
        setAccount({
            ...account,
            [e.target.name]: e.target.value
        })
    }
    const handleCreateAccount = (e) => {
        e.preventDefault()
        if (account.password !== account.confirm_password) {
            console.log('password confirmed wrong');
        } else {
            console.log('click')
            registerPost(account, dispatch)
        }
    }
    return (
        <div className="login">
            {console.log(account)}
            <div className="login__left"></div>
            <div className="login__right">
                <div className="login-box__register">
                    <form className="login-box__top" onSubmit={handleCreateAccount} >
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            className="login-input"
                            value={account.username}
                            onChange={handleFormChange}
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="login-input"
                            value={account.email}
                            onChange={handleFormChange}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="login-input"
                            value={account.password}
                            onChange={handleFormChange}
                        />
                        <input
                            name="confirm_password"
                            type="password"
                            placeholder="Confirm Password"
                            className="login-input"
                            value={account.confirm_password}
                            onChange={handleFormChange}
                        />
                        <button type="submit" className="create-button__register" >Create New Account</button>
                    </form>
                    <span className="login-forget__register">Already have an account ?</span>
                    <button className="login-button__register" onClick={() => { history.push('/login') }}>Log in</button>
                </div>
            </div>
        </div>
    )
}
